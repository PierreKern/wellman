import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";
import LogisticTable from "@/app/components/LogisticTable";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const logistics = await prisma.logistic.findMany({
    orderBy: { dateEntree: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <button
        type="button"
        className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 
                   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm 
                   px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                   focus:outline-none dark:focus:ring-blue-800"
      >
        <Link href={"/admin/autre"}>Tableau de bord "Autre"</Link>
      </button>

      <LogoutButton />

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Tableau de bord - Visiteurs “Logistiques”
      </h1>

      {/* ✅ Composant client-side filtrable */}
      <LogisticTable data={logistics} />
    </main>
  );
}
