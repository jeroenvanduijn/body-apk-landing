import { NextRequest, NextResponse } from 'next/server';

type LeadData = {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  klacht: string;
  toelichting?: string;
  consent: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    const requiredFields: (keyof LeadData)[] = ['voornaam', 'achternaam', 'email', 'telefoon', 'klacht', 'consent'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'consent') return data[field] !== true;
      return !data[field];
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the lead data (in production, this would be sent to a CRM, database, or email service)
    console.log('=== NEW BODY-APK LEAD ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Name:', `${data.voornaam} ${data.achternaam}`);
    console.log('Email:', data.email);
    console.log('Phone:', data.telefoon);
    console.log('Complaint Type:', data.klacht);
    console.log('Additional Info:', data.toelichting || 'None provided');
    console.log('Consent:', data.consent);
    console.log('========================');

    // In production, you would:
    // 1. Store in database
    // 2. Send to CRM (e.g., HubSpot, Salesforce)
    // 3. Send notification email to staff
    // 4. Send confirmation email to lead
    // 5. Trigger any automations (e.g., Zapier)

    // Example: Send to external webhook (commented out)
    // await fetch('https://hooks.zapier.com/hooks/catch/xxx/xxx/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...data,
    //     source: 'body-apk-landing-page',
    //     timestamp: new Date().toISOString()
    //   })
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
        leadId: `BAPK-${Date.now()}` // Placeholder ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optionally handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
