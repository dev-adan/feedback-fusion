/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_key" ON "votes"("userId");
