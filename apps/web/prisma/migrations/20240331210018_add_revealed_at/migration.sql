-- AlterTable
ALTER TABLE "passwords" ADD COLUMN     "revealedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "passwords_revealedat_idx" ON "passwords"("revealedAt" DESC);
