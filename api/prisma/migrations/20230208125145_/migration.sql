/*
  Warnings:

  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_format_id_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_theme_id_fkey`;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_format_id_fkey` FOREIGN KEY (`format_id`) REFERENCES `event_format`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_theme_id_fkey` FOREIGN KEY (`theme_id`) REFERENCES `event_theme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
