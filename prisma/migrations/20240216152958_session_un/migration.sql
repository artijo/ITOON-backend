/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `CoinTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CoinTransaction_sessionId_key` ON `CoinTransaction`(`sessionId`);
