import { NextRequest, NextResponse } from 'next/server';

type Step1Data = {
  step: 1;
  voornaam: string;
  email: string;
};

type Step2Data = {
  step: 2;
  voornaam: string;
  email: string;
  telefoon?: string;
  voorkeur_tijdstip?: string;
};

export async function POST(request: NextRequest) {
  try {
    const data: Step1Data | Step2Data = await request.json();

    if (!data.voornaam || !data.email) {
      return NextResponse.json(
        { error: 'Voornaam en e-mail zijn verplicht' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres' },
        { status: 400 }
      );
    }

    const stepLabel = data.step === 2 ? 'STEP 2 (belafspraak)' : 'STEP 1 (email)';

    console.log(`=== VARIANT B LEAD - ${stepLabel} ===`);
    console.log('Timestamp:', new Date().toISOString());
    console.log('Voornaam:', data.voornaam);
    console.log('Email:', data.email);
    if (data.step === 2) {
      console.log('Telefoon:', (data as Step2Data).telefoon || 'Niet ingevuld');
      console.log('Voorkeur:', (data as Step2Data).voorkeur_tijdstip || 'Niet ingevuld');
    }
    console.log('================================');

    return NextResponse.json(
      { success: true, step: data.step },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing variant B lead:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis' },
      { status: 500 }
    );
  }
}
