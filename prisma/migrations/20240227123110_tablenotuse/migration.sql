/*
  Warnings:

  - You are about to drop the `announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `announcement` DROP FOREIGN KEY `Announcement_favoriteId_fkey`;

-- DropForeignKey
ALTER TABLE `buycartoon` DROP FOREIGN KEY `buyCartoon_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `episode` DROP FOREIGN KEY `Episode_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `favoritecartoon` DROP FOREIGN KEY `favoriteCartoon_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_episodeId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_cartoonId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropTable
DROP TABLE `announcement`;

-- DropTable
DROP TABLE `review`;

-- AddForeignKey
ALTER TABLE `Episode` ADD CONSTRAINT `Episode_cartoonId_fkey` FOREIGN KEY (`cartoonId`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buyCartoon` ADD CONSTRAINT `buyCartoon_cartoonId_fkey` FOREIGN KEY (`cartoonId`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favoriteCartoon` ADD CONSTRAINT `favoriteCartoon_cartoonId_fkey` FOREIGN KEY (`cartoonId`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_cartoonId_fkey` FOREIGN KEY (`cartoonId`) REFERENCES `Cartoon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_episodeId_fkey` FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
