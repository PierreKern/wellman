import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const entry = await prisma.logistic.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        company: body.company,
        selectedOption: body.selectedOption,
        tractorRegistration: body.tractorRegistration,
        trailerRegistration: body.trailerRegistration,
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Erreur API Logistic entrée:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
