import { query } from '@/lib/postgres';
import { NextRequest, NextResponse } from 'next/server';

interface ContactUser {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation (basic check)
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Insert contact into public.users table
    const result = await query<{ id: number }>(
      `INSERT INTO public.users (name, email, phone) 
       VALUES ($1, $2, $3) 
       RETURNING id`,
      [name.trim(), email.trim().toLowerCase(), phone.trim()]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! We will contact you soon.',
        id: result[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', errorMessage);
    console.error('Error stack:', errorStack);
    
    return NextResponse.json(
      { 
        error: 'Unable to process your request. Please try again later.',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
