/*
  Warnings:

  - You are about to drop the `buyepisode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `buyepisode` DROP FOREIGN KEY `buyEpisode_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `buyepisode` DROP FOREIGN KEY `buyEpisode_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `buyepisode` DROP FOREIGN KEY `buyEpisode_userId_fkey`;

-- DropTable
DROP TABLE `buyepisode`;

-- CreateTable
CREATE TABLE `buyCartoon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `cartoonId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `buyCartoon` ADD CONSTRAINT `buyCartoon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buyCartoon` ADD CONSTRAINT `buyCartoon_cartoonId_fkey` FOREIGN KEY (`cartoonId`) REFERENCES `Cartoon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
