/*
  Warnings:

  - A unique constraint covering the columns `[dna]` on the table `Dna` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dna_dna_key" ON "Dna"("dna");
