import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('property_dealing');
    const properties = await db.collection('properties').find({}).toArray();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to load properties' }, { status: 500 });
  }
}
