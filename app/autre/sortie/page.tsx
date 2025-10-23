"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";

export default function HomeFR() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
  });
  const [loading, setLoading] = useState(false);
  const sigPadRef = useRef<SignatureCanvas | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClear = (): void => {
    sigPadRef.current?.clear();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sigPadRef.current?.isEmpty()) {
      alert("Veuillez signer le formulaire.");
      return;
    }
    const signatureImage = sigPadRef.current!
      .getTrimmedCanvas()
      .toDataURL("image/png");
    const payload = { ...formData, signature: signatureImage };
    console.log("Données du formulaire :", payload);
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen bg-gray-50 pt-40 pb-20">
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="max-w-3xl w-full mx-auto p-8 bg-white rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              required
              className={inputStyle}
            />
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              required
              className={inputStyle}
            />
          </div>

          <input
            type="text"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            placeholder="Nom de l'entreprise"
            required
            className={inputStyle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Signature
              </label>
              <div className="w-full h-[200px] bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
                <SignatureCanvas
                  ref={sigPadRef}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "w-full h-full",
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="w-full p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                EFFACER
              </button>
            </div>

            <div className="flex items-end h-full">
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[50px] rounded-md text-lg font-semibold transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1864ab] hover:bg-[#1c7ed6] text-white"
                }`}
              >
                {loading ? "Envoi..." : "ENVOYER"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
