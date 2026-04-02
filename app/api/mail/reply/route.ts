import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log("--- [API/Mail] Mencoba memproses pengiriman email ---");
  
  try {
    const body = await req.json();
    const { to, subject, message, attachments, apiKey } = body;

    // 1. Log untuk Debugging (Cek di terminal VS Code)
    console.log("Tujuan:", to);
    console.log("API Key dari PHP:", apiKey);
    console.log("API Key di ENV:", process.env.API_MAIL_KEY);

    // 2. Security Check
    if (!apiKey || apiKey !== process.env.API_MAIL_KEY) {
      console.error("EROR: API Key tidak cocok!");
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 3. Konfigurasi Transporter dengan Default Value (mencegah crash)
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.MAIL_PORT) || 465,
      secure: process.env.MAIL_SECURE === 'true', // true untuk port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Membantu koneksi dari localhost agar tidak diblokir
      }
    });

    // 4. Verifikasi Koneksi SMTP sebelum mengirim
    try {
      await transporter.verify();
      console.log("Koneksi ke SMTP Gmail Berhasil!");
    } catch (verifyError: any) {
      console.error("Gagal Login ke Gmail:", verifyError.message);
      return NextResponse.json({ 
        success: false, 
        message: 'SMTP Login Failed', 
        error: verifyError.message 
      }, { status: 500 });
    }

    // 5. Susun Email
    const mailOptions: any = {
      from: `"${process.env.MAIL_FROM_NAME || 'Havia Studio'}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html: message.replace(/\n/g, '<br/>'),
    };

    if (attachments && Array.isArray(attachments)) {
      mailOptions.attachments = attachments.map((att: any) => ({
        filename: att.filename,
        content: Buffer.from(att.content, 'base64'),
      }));
    }

    // 6. Kirim Email
    await transporter.sendMail(mailOptions);
    console.log("Email BERHASIL terkirim ke:", to);

    return NextResponse.json({ success: true, message: 'Email sent successfully via Nodemailer' });

  } catch (error: any) {
    console.error('SERVER CRASH ERROR:', error.message);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message 
    }, { status: 500 });
  }
}