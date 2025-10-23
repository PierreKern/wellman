"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";

export default function LogistiqueSlider() {
  const introImages = ["/FR_iso.png", "/FR_interdictions.png", "/FR_obligations.png"];

  const [reason, setReason] = useState<string | null>(null);
  const postChoiceImagesByReason: Record<string, string> = {
    dechargement: "/EN_obligation_dechargement.png",
    depotage: "/FR_obligations_acces.png",
    quai: "/EN_obligation_dechargement.png",
    expedition: "/EN_obligation_dechargement.png",
  };
  const postChoiceCommonImages = [
    "/FR_obligations_chauffeur.png",
    "/FR_deversement.png",
    "/FR_plan_circulation.png",
  ];

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "choix" | "postChoice" | "form">("intro");

  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const handleNextIntro = () => {
    if (index < introImages.length - 1) setIndex(index + 1);
    else {
      setPhase("choix");
      setIndex(0);
    }
  };

  const handleSelectReason = (r: string) => {
    setReason(r);
    setPhase("postChoice");
    setIndex(0);
  };

  const handleNextPostChoice = () => {
    const totalSlides = 1 + postChoiceCommonImages.length;
    if (index < totalSlides - 1) setIndex(index + 1);
    else setPhase("form");
  };

  const getPostChoiceImage = () => {
    if (!reason) return "";
    return index === 0 ? postChoiceImagesByReason[reason] : postChoiceCommonImages[index - 1];
  };

  const clearSignature = () => sigCanvas.current?.clear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signatureData = sigCanvas.current?.toDataURL();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    console.log("📝 Formulaire envoyé :", data);
    console.log("✍️ Signature base64 :", signatureData);

    alert("Formulaire soumis avec succès !");
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4">
      {/* Logo */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-8 mt-20 w-full max-w-5xl">
        {/* === PHASE INTRO === */}
        {phase === "intro" && (
          <>
            <div className="relative w-full flex justify-center">
              <Image
                key={introImages[index]}
                src={introImages[index]}
                alt={`Intro ${index + 1}`}
                width={900}
                height={600}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg transition-all duration-500"
              />
            </div>
            <button
              onClick={handleNextIntro}
              className="w-[150px] h-[50px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex justify-center items-center transition-colors"
            >
              Suivant
            </button>
          </>
        )}

        {/* === PHASE CHOIX === */}
        {phase === "choix" && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Merci de sélectionner la raison de votre présence sur site
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "dechargement", img: "/dechargement.png", label: "Chargement/Déchargement camion" },
                { id: "depotage", img: "/granule.jpg", label: "Dépotage granulé" },
                { id: "quai", img: "/quai.jpg", label: "Déchargement à quai" },
                { id: "expedition", img: "/expedition.png", label: "Déchargement/Expédition produits chimiques/déchets dangereux" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleSelectReason(r.id)}
                  className="flex flex-col items-center bg-white rounded-xl shadow-lg p-4 hover:scale-105 transition-transform max-w-[280px] mx-auto"
                >
                  <div className="relative w-full h-54">
                    <Image src={r.img} alt={r.label} fill className="object-contain" />
                  </div>
                  <p className="mt-2 text-lg font-semibold text-black text-center">{r.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === PHASE POST-CHOICE === */}
        {phase === "postChoice" && reason && (
          <>
            <div className="relative w-full max-w-4xl h-64 sm:h-96 md:h-[60vh] flex justify-center items-center">
              <Image
                key={getPostChoiceImage()}
                src={getPostChoiceImage()}
                alt={`Post-choice ${index + 1}`}
                fill
                className="object-contain rounded-xl shadow-lg transition-all duration-500"
              />
            </div>
            <button
              onClick={handleNextPostChoice}
              className="w-[150px] h-[50px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex justify-center items-center transition-colors"
            >
              Suivant
            </button>
          </>
        )}

        {/* === PHASE FORM === */}
        {phase === "form" && (
          <div className="text-center w-full max-w-lg">
            <h2 className="text-2xl text-black font-bold mb-4">Merci, veuillez remplir le formulaire :</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input type="text" name="nom" placeholder="Nom" className="border text-black rounded p-2" required />
              <input type="text" name="prenom" placeholder="Prénom" className="border text-black rounded p-2" required />
              <input
                type="text"
                name="entreprise"
                placeholder="Nom de l’entreprise"
                className="border text-black rounded p-2"
                required
              />
              <input
                type="text"
                name="tracteur"
                placeholder="Immatriculation tracteur"
                className="border text-black rounded p-2"
                required
              />
              <input
                type="text"
                name="remorque"
                placeholder="Immatriculation remorque"
                className="border text-black rounded p-2"
                required
              />

              <div className="flex flex-col items-center border rounded p-3 bg-white">
                <p className="font-medium text-black mb-2">Signature :</p>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  backgroundColor="white"
                  canvasProps={{
                    className: "border border-gray-400 rounded bg-gray-50 w-[300px] h-[150px]",
                  }}
                />
                <button
                  type="button"
                  onClick={clearSignature}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Effacer la signature
                </button>
              </div>

              <p className="text-gray-600 mt-2">Raison : {reason}</p>

              <button
                type="submit"
                className="bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl py-2 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
