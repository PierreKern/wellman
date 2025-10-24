-- AlterTable
ALTER TABLE "Logistic" ADD COLUMN     "dateSortie" TIMESTAMP(3),
ADD COLUMN     "tempsPasse" INTEGER;

-- AlterTable
ALTER TABLE "Others" ADD COLUMN     "dateSortie" TIMESTAMP(3),
ADD COLUMN     "tempsPasse" INTEGER;
