import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const appId = parseInt(id);

    if (isNaN(appId)) {
      return NextResponse.json(
        { error: 'Invalid application ID' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    try {
      await connection.query(
        'DELETE FROM staff_applications WHERE id = ?',
        [appId]
      );

      connection.release();

      return NextResponse.json(
        { message: 'Application deleted successfully' },
        { status: 200 }
      );
    } catch (dbError) {
      connection.release();
      throw dbError;
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
