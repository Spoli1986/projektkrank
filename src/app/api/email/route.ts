import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { env } from '../../../../utils/env';
import { ShoppingCart, deleteAnonymousCart, getCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface InvoiceTo {
  name: string;
  address: string;
  zip: string;
  country: string;
  city: string;
}

async function generateInvoicePDF(cart: ShoppingCart | null, invoiceTo: InvoiceTo): Promise<string> {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([600, 800]); // Increase page height for address fields

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const cellPadding = 5;
  const cellWidth = 150;
  const cellHeight = 20;
  const startX = 50;
  let startY = page.getHeight() - 50;

  const drawCell = (text: string, x: number, y: number) => {
    page.drawText(text, {
      x: x + cellPadding,
      y: y - cellPadding,
      size: 10,
      font: font,
      color: rgb(0, 0, 0),
    });
  };

  const drawRow = (row: string[], y: number) => {
    let x = startX;
    row.forEach((cell, index) => {
      drawCell(cell, x, y);
      x += cellWidth;
    });
  };

  // Draw "Invoice To" address
  const invoiceToAddress = [
    'Invoice To:',
    invoiceTo.name,
    invoiceTo.address,
    invoiceTo.zip + '' + invoiceTo.city,
    invoiceTo.country,
  ];
  invoiceToAddress.forEach((line, index) => {
    drawCell(line, startX + 300, startY - index * cellHeight);
  });

  // Draw "From" address (assuming PK Labor4, Buchsisstrasse 4, 3380 Wangen an der Aare)
  const fromAddress = ['From:', 'PK Labor4', 'Buchsisstrasse 4', '3380 Wangen an der Aare', 'Switzerland'];
  fromAddress.forEach((line, index) => {
    drawCell(line, startX, startY - index * cellHeight); // Adjust x position for "From" address
  });

  cart!.items.forEach((item, rowIndex) => {
    const row = [
      (rowIndex + 1).toString(),
      `${item.quantity} Stk`,
      `${item.product.description} ${item.product.size ? `, Grösse ${item.product.size}` : ''}`,
      formatPrice(item.product.price * item.quantity),
    ];

    drawRow(row, startY - rowIndex * cellHeight);
  });
  page.drawRectangle({
    x: startX,
    y: startY - (cart!.items.length + 10) * cellHeight,
    width: page.getWidth() - startX,
    height: cellHeight,
    color: rgb(0.7, 0.7, 0.7), // Grey background color
  });
  // Draw totals
  const totalRow = ['', '', 'Summe:', formatPrice(cart!.subtotal)];
  drawRow(totalRow, startY - (cart!.items.length + 20) * cellHeight);

  // Draw shipping
  const shippingRow = ['', '', 'Versand:', formatPrice(1000)];
  drawRow(shippingRow, startY - (cart!.items.length + 30) * cellHeight);

  // Draw total amount
  const totalAmountRow = ['', '', 'Rechnungstotal:', formatPrice(cart!.subtotal + 1000)];
  drawRow(totalAmountRow, startY - (cart!.items.length + 40) * cellHeight);

  return pdfDoc.saveAsBase64({ dataUri: true });
}

export async function POST(request: NextRequest) {
  const { email, name, address, phone, zip, country, total, cartId, orderId, city } = await request.json();
  const invoiceTo: InvoiceTo = {
    name,
    address,
    zip,
    country,
    city,
  };
  const date = new Date();
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  const cart: ShoppingCart | null = await getCart();
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

  const pdfBase64String = await generateInvoicePDF(cart, invoiceTo);

  const mailOptions: Mail.Options = {
    from: env.MY_EMAIL,
    to: email,
    // cc: 'stefan@projektkrank.ch',
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Bestellung projektkrank.ch Nr.: ${orderId}`,
    text: `${name} hat etwas bestellt. Tel: ${phone}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice</title>
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
        Hallo ${name},
      </p>
      <p>
        Vielen Dank für Deine Bestellung bei uns. Wir schätzen Dein Vertrauen in unsere Band.
      </p>
      <p>
        Bitte überweise den Rechnungsbetrag inklusive Versandkosten auf folgendes Konto:
      </p>
      <p>
        IBAN: CH41 0630 0371 0771 5512 / TWINT: 076 572 16 39<br>
        Empfänger: Stefan Gehri<br>
        Mitteilung: ${orderId}
      </p>
      <p>
        Die bestellten Artikel werden nach Zahlungseingang innerhalb<br> der Nächsten 10 Tagen verschickt.
      </p>
      <p>
        Bei Fragen oder Unklarheiten stehen wir Dir gerne zur Verfügung.
      </p>
      <p>
        Liebe Grüsse
      </p>
      <p>
        Stefu, Hene, Davill, Peter
      </p>
      <table>
    <thead>
      <tr>
        <th colspan="2">Lieferadresse</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Name:</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Straße:</td>
        <td>${address}</td>
      </tr>
      <tr>
        <td>Stadt:</td>
        <td>${city}</td>
      </tr>
      <tr>
        <td>PLZ:</td>
        <td>${zip}</td>
      </tr>
      <tr>
        <td>Land:</td>
        <td>${country}</td>
      </tr>
      <tr>
        <td>E-Mail:</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Telefon:</td>
        <td>${phone}</td>
      </tr>
    </tbody>
  </table>
      <table>
        <thead>
          <tr>
            <th style="width: 20mm;">Position</th>
            <th style="width: 20mm;">Anzahl</th>
            <th>Bezeichnung</th>
            <th style="width: 30mm;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cart?.items
            .map(
              (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item.quantity} Stk</td>
              <td>${item.product.description}${item.product.size ? `, Grösse ${item.product.size}` : ''}</td>
              <td>${formatPrice(item.product.price * item.quantity)}</td>
            </tr>`,
            )
            .join('')}
          <tr>
            <td colspan="2"></td>
            <td style="font-weight: bold;">Summe</td>
            <td style="font-weight: bold;">${formatPrice(cart?.subtotal!)}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Versand</td>
            <td>${formatPrice(1000)}</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td style="font-weight: bold;">Rechnungstotal</td>
            <td style="font-weight: bold;">${formatPrice(cart?.subtotal! + 1000)}</td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
    
    `,
    attachments: [
      {
        filename: 'invoice' + orderId + '.pdf',
        content: pdfBase64String.split('base64,')[1],
        encoding: 'base64',
      },
    ],
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
    deleteAnonymousCart(cartId);
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
