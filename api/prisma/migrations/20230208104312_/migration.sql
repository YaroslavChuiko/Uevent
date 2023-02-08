/*
  Warnings:

  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[name]` on the table `event_format` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `event_theme` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `subscription_to_company` DROP FOREIGN KEY `subscription_to_company_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscription_to_company` DROP FOREIGN KEY `subscription_to_company_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_event` DROP FOREIGN KEY `user_event_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_event` DROP FOREIGN KEY `user_event_user_id_fkey`;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `event_format_name_key` ON `event_format`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `event_theme_name_key` ON `event_theme`(`name`);

-- AddForeignKey
ALTER TABLE `user_event` ADD CONSTRAINT `user_event_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_event` ADD CONSTRAINT `user_event_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription_to_company` ADD CONSTRAINT `subscription_to_company_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscription_to_company` ADD CONSTRAINT `subscription_to_company_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
