import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const entry = await prisma.others.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        company: body.company,
        telephone: body.telephone,
        distanceParcourue: parseInt(body.distanceParcourue, 10),
        energie: body.energie,
        nbrPersonnes: parseInt(body.nbrPersonnes, 10),
        personneAContacter: body.personneAContacter,
        // @ts-ignore
        puissanceFiscale: parseInt(body.puissanceFiscale, 10),
        registration: body.plaque
      },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error("Erreur API Others entrée:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
