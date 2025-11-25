-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "isSolved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT;
