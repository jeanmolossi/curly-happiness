-- CreateTable
CREATE TABLE "passwords" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "shortcut" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "passwords_id_idx" ON "passwords"("id");

-- CreateIndex
CREATE INDEX "passwords_ownerid_idx" ON "passwords"("ownerId");

-- CreateIndex
CREATE INDEX "passwords_updatedat_idx" ON "passwords"("updatedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "passwords_shortcut_ownerId_key" ON "passwords"("shortcut", "ownerId");

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
