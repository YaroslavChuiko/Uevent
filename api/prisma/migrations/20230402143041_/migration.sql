/*
  Warnings:

  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `stripe_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL;
