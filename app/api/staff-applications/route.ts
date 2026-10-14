import { NextRequest, NextResponse } from 'next/server';
import pool, { initializeDatabase, sendStaffApplicationEmail, sendStaffApplicationConfirmationEmail, generateApplicationId } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting application submission...');
    await initializeDatabase();
    console.log('Database initialized');
    
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const applicationId = generateApplicationId();
    console.log('Generated application ID:', applicationId);

    const connection = await pool.getConnection();
    console.log('Database connection acquired');
    
    try {
      await connection.query(
        'INSERT INTO staff_applications (application_id, name, email, message) VALUES (?, ?, ?, ?)',
        [applicationId, name, email, message]
      );
      console.log('Application saved to database');
    } catch (dbError) {
      console.error('Database insert error:', dbError);
      connection.release();
      throw dbError;
    }
    
    connection.release();

    // Send email notification to admin
    try {
      await sendStaffApplicationEmail(name, email, message);
      console.log('Email sent successfully to admin');
    } catch (emailError) {
      console.error('Email sending error to admin:', emailError);
      // Continue even if email fails
    }

    // Send confirmation email to applicant
    try {
      await sendStaffApplicationConfirmationEmail(name, email, applicationId);
      console.log('Confirmation email sent successfully to applicant');
    } catch (emailError) {
      console.error('Confirmation email sending error:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        applicationId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initializeDatabase();
    
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM staff_applications ORDER BY created_at DESC'
    );
    connection.release();

    return NextResponse.json({ applications: rows });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
