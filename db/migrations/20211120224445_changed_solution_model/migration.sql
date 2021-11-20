/*
  Warnings:

  - You are about to drop the column `executionTime` on the `Solution` table. All the data in the column will be lost.
  - You are about to drop the column `languageVersion` on the `Solution` table. All the data in the column will be lost.
  - Added the required column `combinedExecutionTime` to the `Solution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "executionTime",
DROP COLUMN "languageVersion",
ADD COLUMN     "combinedExecutionTime" INTEGER NOT NULL;
