// @ts-nocheck
import { prisma } from "@/app/lib/prisma";
import getServerSession from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const others = await prisma.others.findMany({
    orderBy: { dateEntree: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Tableau de bord - Visiteurs “Others”
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-[#1864ab] text-white">
            <tr>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prénom</th>
              <th className="p-3 text-left">Entreprise</th>
              <th className="p-3 text-left">Date entrée</th>
              <th className="p-3 text-left">Date sortie</th>
              <th className="p-3 text-left">Durée</th>
            </tr>
          </thead>
          <tbody>
            {others.map((o) => (
              <tr key={o.id} className="border-t border-gray-200">
                <td className="p-3 text-black">{o.firstName}</td>
                <td className="p-3 text-black">{o.lastName}</td>
                <td className="p-3 text-black">{o.company}</td>
                <td className="p-3 text-black">{new Date(o.dateEntree).toLocaleString()}</td>
                <td className="p-3 text-black">
                  {o.dateSortie ? new Date(o.dateSortie).toLocaleString() : "—"}
                </td>
                <td className="p-3 text-black">{o.tempsPasse ?? "—"} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
