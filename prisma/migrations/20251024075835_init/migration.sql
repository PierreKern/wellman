-- CreateTable
CREATE TABLE "Logistic" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "tractorRegistration" TEXT NOT NULL,
    "trailerRegistration" TEXT NOT NULL,
    "dateEntree" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Others" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "distanceParcourue" INTEGER NOT NULL,
    "energie" TEXT NOT NULL,
    "nbrPersonnes" INTEGER NOT NULL,
    "personneAContacter" TEXT NOT NULL,
    "dateEntree" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Others_pkey" PRIMARY KEY ("id")
);
