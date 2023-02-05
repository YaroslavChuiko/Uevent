/*
  Warnings:

  - You are about to drop the column `format` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `event` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `format_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `format`,
    DROP COLUMN `location`,
    DROP COLUMN `theme`,
    ADD COLUMN `format_id` INTEGER NOT NULL,
    ADD COLUMN `latitude` DECIMAL(7, 5) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(7, 5) NOT NULL,
    ADD COLUMN `theme_id` INTEGER NOT NULL,
    MODIFY `date` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `event_format` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_format_id_fkey` FOREIGN KEY (`format_id`) REFERENCES `event_format`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_theme_id_fkey` FOREIGN KEY (`theme_id`) REFERENCES `event_theme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
