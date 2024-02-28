import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { env } from '../../../../utils/env';
import { deleteAnonymousCart } from '../../../../utils/db/cart';

export async function POST(request: NextRequest) {
  const { email, name, address, phone, zip, country, total, cartId } = await request.json();
  console.log(email, name, address, phone, zip, country, total);
  deleteAnonymousCart(cartId);

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
    to: email,
    // cc: 'stefan@projektkrank.ch',
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: `${name} hat etwas bestellt. Tel: ${phone}`,
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
