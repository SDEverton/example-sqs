/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Error` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `Error` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Error" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Integration" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Integration_reference_key" ON "Integration"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "Error_reference_key" ON "Error"("reference");
