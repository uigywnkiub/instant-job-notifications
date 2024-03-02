import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = "edge";

export async function POST(
  req: NextApiRequest & Request,
  res: NextApiResponse
) {
  try {
    const cookieStore = cookies();
    const isSendEmail = cookieStore.get("isSendEmail");

    const { email } = await req.json();

    if (isSendEmail?.value) {
      return NextResponse.json(
        { error: "Already send", isError: true },
        { status: 409 }
      );
    }

    if (!process.env.RESEND_EMAIL || !email) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "instant-job-notifications@resend.dev",
      to: process.env.RESEND_EMAIL,
      subject: "Membership",
      html: `<p><strong>${email}</strong></p>`,
    });

    return NextResponse.json(
      { message: "ok" },
      {
        headers: {
          "Set-Cookie": "isSendEmail=true; HttpOnly; Secure",
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error, isError: true }, { status: 500 });
  }
}
