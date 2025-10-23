"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeFR() {
  const router = useRouter();
  const images = ["/EN_certif.png", "/EN_regles_secu.png", "/EN_plan.png", "/EN_obligations.png", "/EN_interdictions.png","/EN_deversement.png"];
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-8 mt-20">
        {!showForm ? (
                    <>
            <div className="w-[1000px] max-w-[90vw] h-[600px] flex justify-center items-center">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`Slide ${index + 1}`}
                width={800}
                height={600}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg transition-all duration-500"
              />
            </div>

            <button
              onClick={handleNext}
              className="w-[150px] h-[50px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex flex-col justify-center items-center text-center transition-colors"
            >
              Suivant
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Merci, veuillez remplir le formulaire :
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-[300px]"
            >
              <input
                type="text"
                placeholder="Nom"
                required
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Prénom"
                required
                className="border rounded p-2"
              />
              <select required className="border rounded p-2">
                <option value="">Type de visiteur</option>
                <option value="interne">Interne</option>
                <option value="externe">Externe</option>
              </select>
              <button
                type="submit"
                className="bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl py-2 transition-colors"
              >
                Envoyer
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
