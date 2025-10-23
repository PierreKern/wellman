"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MOCK_DATA = {
  contactsWellman: [
    { id: 1, nom: "BREDARD Sébastien" },
    { id: 2, nom: "FAVARD Annaëlle" },
    { id: 3, nom: "FAVRE Fabien" },
    { id: 4, nom: "FAVRE Romain" },
    { id: 5, nom: "HACQUART Marjolaine" },
    { id: 6, nom: "HARMAND Gauthier" },
    { id: 7, nom: "KATIC Sacha" },
    { id: 8, nom: "KISYLYCZKO Maxime" },
    { id: 9, nom: "LEROY Philippe" },
    { id: 10, nom: "MORLIN Nicolas" },
    { id: 11, nom: "RENAULT Béatrice" },
  ],
};

export default function HomeFR() {
  const router = useRouter();
  const images = [
    "/EN_certif.png",
    "/EN_regles_secu.png",
    "/EN_plan.png",
    "/EN_obligations.png",
    "/EN_interdictions.png",
    "/EN_deversement.png",
  ];

  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
    telephone: "",
    personnesPresentes: "",
    contactWellman: "",
    distance: "",
    energie: "",
    puissanceFiscale: "",
  });

  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Données du formulaire soumises :", formData);
    router.push("/");
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const selectStyle = `${inputStyle} appearance-none`;

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

      <div className="flex flex-col items-center gap-8 w-full">
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
            <h2 className="text-2xl text-black font-bold mb-4 text-center">
              Please fill out this form 
            </h2>

            <div className="max-w-3xl w-full mx-auto p-8 md:p-10 bg-white rounded-lg shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                    className={inputStyle}
                  />
                </div>

                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="Company's name"
                  required
                  className={inputStyle}
                />

                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                  className={inputStyle}
                />

                <input
                  type="number"
                  name="personnesPresentes"
                  value={formData.personnesPresentes}
                  onChange={handleChange}
                  placeholder="Number of people present"
                  min="1"
                  required
                  className={inputStyle}
                />

                <select
                  name="contactWellman"
                  value={formData.contactWellman}
                  onChange={handleChange}
                  required
                  className={selectStyle}
                >
                  <option value="" disabled>
                    Wellman contact person
                  </option>
                  {MOCK_DATA.contactsWellman.map((c) => (
                    <option key={c.id} value={c.nom}>
                      {c.nom}
                    </option>
                  ))}
                </select>

                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-2xl text-black font-bold mb-5">CARBONE BALANCE</h2>
                  <div className="space-y-6">
                    <input
                      type="number"
                      name="distance"
                      value={formData.distance}
                      onChange={handleChange}
                      placeholder="Distance traveled to come to Wellman"
                      min="0"
                      required
                      className={inputStyle}
                    />
                    <fieldset>
                      <legend className="text-base font-medium text-gray-800 mb-3">
                        Energie used
                      </legend>
                      <div className="space-y-2">
                        {["Petrol", "Diesel", "Electric", "Hybride"].map(
                          (energie) => (
                            <label
                              key={energie}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="energie"
                                value={energie}
                                checked={formData.energie === energie}
                                onChange={handleChange}
                                required
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-700">{energie}</span>
                            </label>
                          )
                        )}
                      </div>
                    </fieldset>
                    <input
                      type="number"
                      name="puissanceFiscale"
                      value={formData.puissanceFiscale}
                      onChange={handleChange}
                      placeholder="Fiscal power of the vehicle"
                      min="0"
                      required
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#1864ab] text-white font-semibold py-3 px-12 rounded-lg hover:bg-[#1c7ed6] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  );
}