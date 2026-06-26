import { query } from '@/lib/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic connection
    const result = await query<{ current_database: string }>(
      'SELECT current_database();'
    );

    // Check if users table exists
    const tableCheck = await query<{ exists: boolean }>(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );`
    );

    return NextResponse.json({
      success: true,
      database: result[0]?.current_database,
      usersTableExists: tableCheck[0]?.exists,
      message: 'Database connection successful!',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        stack: errorStack,
        message: 'Failed to connect to database',
      },
      { status: 500 }
    );
  }
}
