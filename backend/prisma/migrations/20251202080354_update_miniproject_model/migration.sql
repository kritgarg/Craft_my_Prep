/*
  Warnings:

  - You are about to drop the column `details` on the `MiniProject` table. All the data in the column will be lost.
  - Added the required column `description` to the `MiniProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steps` to the `MiniProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MiniProject" DROP COLUMN "details",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "steps" JSONB NOT NULL,
ALTER COLUMN "difficulty" DROP NOT NULL;
