import { NextRequest, NextResponse } from "next/server";

interface InquiryBody {
  moveIn?: string;
  duration?: string;
  bedrooms?: string;
  area?: string;
  budget?: string;
  guests?: string;
  name: string;
  email: string;
  whatsapp: string;
}

function buildEmailHtml(data: InquiryBody): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Move-in date", data.moveIn || "—"],
    ["Duration", data.duration || "—"],
    ["Bedrooms", data.bedrooms || "—"],
    ["Area preference", data.area || "No preference"],
    ["Budget", data.budget || "—"],
    ["Guests", data.guests || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#5E301F;width:160px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#2D170F;">${value}</td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family:'DM Sans',Arial,sans-serif;background:#FCFAF6;padding:32px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:8px;overflow:hidden;">
    <div style="background:#5E301F;padding:24px 32px;">
      <h1 style="color:white;margin:0;font-size:20px;font-weight:600;">New Seraya Living Inquiry</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #F7F1E8;">
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  let body: InquiryBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, whatsapp } = body;
  if (!name || !email || !whatsapp) {
    return NextResponse.json(
      { error: "Name, email and WhatsApp number are required" },
      { status: 400 }
    );
  }

  const toEmail = process.env.INQUIRY_EMAIL || "hello@serayastays.com";
  const smtpConfigured =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  if (!smtpConfigured) {
    console.log("[Seraya Living] New inquiry (SMTP not configured):", body);
    return NextResponse.json({ success: true });
  }

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Seraya Living" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: buildEmailHtml(body),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Seraya Living] Failed to send inquiry email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
