import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("================= API /contact =====================");
    console.log("📦 Body reçu depuis NextJS:", body);
    
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      console.log("❌ Champs manquants dans la requête !");
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', 
      to: ['qudeglas@gmail.com'], 
      subject: `Nouveau message de ${name}: ${subject}`,
      html: `
        <h2>Nouveau contact depuis le portfolio</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    console.log("🎯 Analyse de la réponse Resend:", { data, error });

    if (error) {
      console.error("❌ Resend a refusé l'envoi:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Resend API Error block triggered:', error);
    return NextResponse.json({ error: 'Failed to send email', details: String(error) }, { status: 500 });
  }
}
