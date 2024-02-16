/*
  Warnings:

  - Added the required column `sessionId` to the `CoinTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CoinTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cointransaction` ADD COLUMN `sessionId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
