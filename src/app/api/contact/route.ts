import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { env } from '../../../../utils/env';

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
      setting service as 'gmail' is same as providing these setings:

      host: "smtp.gmail.com",
      port: 465,
      secure: true

      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: env.MY_EMAIL,
      pass: env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: env.MY_EMAIL,
    to: 'stefan@projektkrank.ch',
    subject: `Kontaktformular: ${name}`,
    text: message,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Kontakt</title>
      <style>
        /* Define any custom styles here */
        table {
          width: 80%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #4A4D51;
          color: #fff;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <p>
        Kontaktaufnahme:
      </p>
      <p>
        ${name}, ${email}
      </p>
      <p>
       Nachricht:
       <br> ${message}
      </p>
    </body>
    </html>
    
    `,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
