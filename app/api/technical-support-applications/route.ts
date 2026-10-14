import { after, NextRequest, NextResponse } from 'next/server';
import pool, { initializeDatabase, generateApplicationId, sendTechnicalSupportApplicationEmail, sendAdminNotificationForTechnicalSupport } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting technical support application submission...');
    if (Number(request.headers.get('content-length')) > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'Uploads are too large. Maximum file size is 5 MB each.' }, { status: 413 });
    }
    const formData = await request.formData();
    const fieldLimits: Record<string, number> = {
      fullName: 255, age: 3, country: 100, city: 100, email: 255, contactNumber: 20,
      languages: 1000, documentsAvailability: 50, compensation: 50,
      pterodactylPanel: 10000, paymenterPanel: 10000, proxmox: 10000,
      vmware: 10000, linux: 10000, developingIdeas: 10000,
    };
    for (const [name, limit] of Object.entries(fieldLimits)) {
      const value = formData.get(name);
      if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) {
        return NextResponse.json({ error: `Please provide ${name} (maximum ${limit} characters).` }, { status: 400 });
      }
      formData.set(name, value.trim());
    }
    const submittedAge = Number(formData.get('age'));
    if (!Number.isInteger(submittedAge) || submittedAge < 1 || submittedAge > 120 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.get('email'))) ||
        !['yes', 'partial', 'no'].includes(String(formData.get('documentsAvailability')))) {
      return NextResponse.json({ error: 'Please check your age, email and document availability.' }, { status: 400 });
    }

    // Extract all form fields
    const fullName = formData.get('fullName') as string;
    const age = parseInt(formData.get('age') as string);
    const country = formData.get('country') as string;
    const city = formData.get('city') as string;
    const email = formData.get('email') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const languages = formData.get('languages') as string;
    const documentsAvailability = formData.get('documentsAvailability') as string;
    const compensation = formData.get('compensation') as string;
    const pterodactylPanel = formData.get('pterodactylPanel') as string;
    const paymenterPanel = formData.get('paymenterPanel') as string;
    const proxmox = formData.get('proxmox') as string;
    const vmware = formData.get('vmware') as string;
    const linux = formData.get('linux') as string;
    const developingIdeas = formData.get('developingIdeas') as string;
    const agreeToRules = formData.get('agreeToRules') === 'true';

    // File uploads - convert to base64
    const identityCard = formData.get('identityCard') as File | null;
    const passportPhoto = formData.get('passportPhoto') as File | null;

    // Validate required fields
    if (!fullName || !age || !country || !city || !email || !contactNumber || 
        !languages || !documentsAvailability || !compensation || 
        !pterodactylPanel || !paymenterPanel || !proxmox || !vmware || 
        !linux || !developingIdeas || !agreeToRules) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    for (const [name, file] of [['Identity card', identityCard], ['Passport photo', passportPhoto]] as const) {
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: `${name} is required.` }, { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: `${name} must be 5 MB or smaller.` }, { status: 413 });
      }
      const allowedTypes = name === 'Passport photo' ? ['image/jpeg', 'image/png'] : ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: `${name}: please upload ${name === 'Passport photo' ? 'JPG or PNG' : 'JPG, PNG or PDF'}.` }, { status: 400 });
      }
    }
    await initializeDatabase();
    const applicationId = generateApplicationId();
    console.log('Generated application ID:', applicationId);

    // Convert files to base64
    let identityCardBase64 = null;
    let passportPhotoBase64 = null;

    if (identityCard) {
      const bytes = await identityCard.arrayBuffer();
      const buffer = Buffer.from(bytes);
      identityCardBase64 = buffer.toString('base64');
      console.log('Identity card converted to base64');
    }

    if (passportPhoto) {
      const bytes = await passportPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      passportPhotoBase64 = buffer.toString('base64');
      console.log('Passport photo converted to base64');
    }

    const connection = await pool.getConnection();
    console.log('Database connection acquired');

    try {
      const [settings] = await connection.query('SELECT @@max_allowed_packet AS packetLimit');
      const packetLimit = (settings as { packetLimit: number }[])[0].packetLimit;
      const documentBytes = (identityCardBase64?.length ?? 0) + (passportPhotoBase64?.length ?? 0);
      if (documentBytes + 512 * 1024 > packetLimit) {
        return NextResponse.json({ error: 'These documents exceed the database upload limit. Please upload smaller files.' }, { status: 413 });
      }
      await connection.query(
        `INSERT INTO technical_support_applications (
          application_id, full_name, age, country, city, email, contact_number,
          languages, documents_availability, compensation,
          pterodactyl_panel, paymenter_panel, proxmox, vmware,
          linux, developing_ideas, identity_card_base64, passport_photo_base64,
          agree_to_rules
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          applicationId, fullName, age, country, city, email, contactNumber,
          languages, documentsAvailability, compensation,
          pterodactylPanel, paymenterPanel, proxmox, vmware,
          linux, developingIdeas, identityCardBase64, passportPhotoBase64,
          agreeToRules
        ]
      );
      console.log('Application saved to database');
    } finally {
      connection.release();
    }

    after(async () => {
      // Send email notification to applicant
      try {
        await sendTechnicalSupportApplicationEmail(fullName, email, applicationId);
        console.log('Email sent successfully to applicant');
      } catch (emailError) {
        console.error('Email sending error to applicant:', emailError);
        // Email failure is logged but does not prevent application submission
        // The application is already saved to the database
      }

      // Send notification to admin
      try {
        await sendAdminNotificationForTechnicalSupport(fullName, email, applicationId);
        console.log('Admin notification sent successfully');
      } catch (emailError) {
        console.error('Admin notification sending error:', emailError);
        // Email failure is logged but does not prevent application submission
        // The application is already saved to the database
      }
    });

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        applicationId,
        emailStatus: 'pending'
      },
      { status: 201 }
    );
  } catch (error) {
    const databaseError = error as { code?: string; errno?: number };
    console.error('Technical support submission failed:', { code: databaseError.code, errno: databaseError.errno });
    return NextResponse.json(
      { error: 'Unable to save your application. Please try again or contact support.', code: 'APPLICATION_SAVE_FAILED' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initializeDatabase();

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM technical_support_applications ORDER BY created_at DESC'
      );
      return NextResponse.json({ applications: rows }, { headers: { 'Cache-Control': 'no-store' } });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
