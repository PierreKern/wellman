import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Fonction utilitaire pour calculer le temps passé en heures et minutes
function calculateTempsPasse(dateEntree: Date, dateSortie: Date) {
  const diffMs = dateSortie.getTime() - dateEntree.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, company } = body;

    // On récupère la dernière entrée correspondante
    const otherEntry = await prisma.others.findFirst({
      where: {
        firstName,
        lastName,
        company,
      },
      orderBy: { dateEntree: "desc" }, // prend la plus récente
    });

    if (!otherEntry) {
      return NextResponse.json(
        { success: false, error: "Entrée introuvable" },
        { status: 404 }
      );
    }

    const dateSortie = new Date();
    const tempsPasse = calculateTempsPasse(otherEntry.dateEntree, dateSortie);

    const updatedEntry = await prisma.others.update({
      where: { id: otherEntry.id },
      data: {
        // @ts-ignore
        dateSortie,
        tempsPasse,
      },
    });

    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Erreur API Others sortie:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
