// app/api/logistic/sortie/route.ts
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Fonction utilitaire pour calculer le temps passé en heures/minutes/secondes
function calculateTempsPasse(dateEntree: Date, dateSortie: Date) {
  const diffMs = dateSortie.getTime() - dateEntree.getTime();
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const minutes = Math.floor((diffMs / 1000 / 60) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, tractorRegistration } = body;

    // On récupère la dernière entrée correspondante
    const logisticEntry = await prisma.logistic.findFirst({
      where: {
        firstName,
        lastName,
        tractorRegistration,
      },
      orderBy: { dateEntree: "desc" }, // prend la plus récente
    });

    if (!logisticEntry) {
      return NextResponse.json(
        { success: false, error: "Entrée logistique introuvable" },
        { status: 404 }
      );
    }

    const dateSortie = new Date();
    const tempsPasse = calculateTempsPasse(logisticEntry.dateEntree, dateSortie);

    const updatedEntry = await prisma.logistic.update({
      where: { id: logisticEntry.id },
      data: {
        // @ts-ignore
        dateSortie,
        tempsPasse,
      },
    });

    return NextResponse.json({ success: true, entry: updatedEntry });
  } catch (error) {
    console.error("Erreur API Logistic sortie:", error);
    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
