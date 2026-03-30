import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface InquiryBody {
  moveIn?: string;
  stayMode?: "months" | "date" | "flexible";
  stayMonths?: number | null;
  moveOut?: string;
  bedrooms?: string | string[];
  areas?: string | string[];
  area?: string;
  budget?: string;
  currency?: string;
  guests?: string;
  name: string;
  email: string;
  whatsapp: string;
}

function buildDurationLabel(data: InquiryBody): string {
  if (data.stayMode === "flexible") return "Flexible";
  if (data.stayMode === "months" && data.stayMonths) {
    return data.stayMonths === 12 ? "12+ months" : `${data.stayMonths} month${data.stayMonths > 1 ? "s" : ""}`;
  }
  if (data.stayMode === "date" && data.moveOut) return `Until ${data.moveOut}`;
  return "—";
}

function buildEmailHtml(data: InquiryBody): string {
  const bedroomsVal = Array.isArray(data.bedrooms) ? (data.bedrooms.length > 0 ? data.bedrooms.join(", ") + " bed" : "Flexible") : (data.bedrooms || "—");
  const areasVal = Array.isArray(data.areas) ? (data.areas.length > 0 ? data.areas.join(", ") : "No preference") : (data.area || "No preference");
  const budgetVal = data.budget ? `${data.currency || "AED"} ${Number(data.budget).toLocaleString()}` : "—";

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Move-in date", data.moveIn || "—"],
    ["Duration", buildDurationLabel(data)],
    ["Bedrooms", bedroomsVal],
    ["Area preference", areasVal],
    ["Budget", budgetVal],
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
  <div style="max-width:600px;margin:0 auto;background:white;overflow:hidden;">
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

  if (!process.env.RESEND_API_KEY) {
    console.log("[Seraya Living] New inquiry (Resend not configured):", body);
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Seraya Living <hello@serayastays.com>",
      to: "hello@serayastays.com",
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
