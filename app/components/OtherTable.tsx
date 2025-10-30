"use client";

import { useState, useMemo } from "react";

export default function OthersTable({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");
  const [filterCompany, setFilterCompany] = useState("");

  // ✅ Recherche & filtre
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase()) ||
        item.company?.toLowerCase().includes(search.toLowerCase()) ||
        item.registration?.toLowerCase().includes(search.toLowerCase()) ||
        item.telephone?.toLowerCase().includes(search.toLowerCase());

      const matchCompany = filterCompany
        ? item.company === filterCompany
        : true;

      return matchSearch && matchCompany;
    });
  }, [data, search, filterCompany]);

  // ✅ Liste des entreprises pour le menu déroulant
  const companyList = Array.from(new Set(data.map((d) => d.company))).sort();

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {/* 🔍 Barre de recherche et filtre entreprise */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher (nom, entreprise, immat...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-1/2 text-black"
        />

        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm text-black"
        >
          <option value="">Toutes les entreprises</option>
          {companyList.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Tableau filtré */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#1864ab] text-white">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Prénom</th>
            <th className="p-3 text-left">Entreprise</th>
            <th className="p-3 text-left">Téléphone</th>
            <th className="p-3 text-left">Immatriculation</th>
            <th className="p-3 text-left">Énergie</th>
            <th className="p-3 text-left">Personnes présentes</th>
            <th className="p-3 text-left">Puissance fiscale</th>
            <th className="p-3 text-left">Date entrée</th>
            <th className="p-3 text-left">Date sortie</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Signature</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((o) => (
              <tr key={o.id} className="border-t border-gray-200">
                <td className="p-3 text-black">{o.lastName}</td>
                <td className="p-3 text-black">{o.firstName}</td>
                <td className="p-3 text-black">{o.company}</td>
                <td className="p-3 text-black">{o.telephone}</td>
                <td className="p-3 text-black">{o.registration}</td>
                <td className="p-3 text-black">{o.energie}</td>
                <td className="p-3 text-black">{o.nbrPersonnes}</td>
                <td className="p-3 text-black">{o.puissanceFiscale}</td>
                <td className="p-3 text-black">
                  {new Date(o.dateEntree).toLocaleString()}
                </td>
                <td className="p-3 text-black">
                  {o.dateSortie ? new Date(o.dateSortie).toLocaleString() : "—"}
                </td>
                <td className="p-3 text-black">{o.tempsPasse ?? "—"} min</td>
                <td className="p-3">
                  {o.signature ? (
                    <img
                      src={o.signature}
                      alt="Signature"
                      className="w-32 h-16 object-contain border rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">Aucune</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center p-4 text-gray-500">
                Aucun résultat trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
