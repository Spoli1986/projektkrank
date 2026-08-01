import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const smtpUser = process.env.MY_EMAIL?.trim();
    const smtpPassword = process.env.MY_PASSWORD?.replace(/\s+/g, '');

    if (!smtpUser || !smtpPassword) {
      console.error('Contact SMTP configuration missing', {
        hasUser: Boolean(smtpUser),
        hasPassword: Boolean(smtpPassword),
        passwordLength: smtpPassword?.length ?? 0,
        vercelEnvironment: process.env.VERCEL_ENV,
      });

      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Projekt Krank Website" <${process.env.MY_EMAIL}>`,
      to: 'stefan@projektkrank.ch',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `
Name: ${name}
E-Mail: ${email}

Nachricht:
${message}
  `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email failed:', error);

    return NextResponse.json({ error: 'Die Nachricht konnte nicht gesendet werden.' }, { status: 500 });
  }
}
