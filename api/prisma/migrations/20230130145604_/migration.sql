/*
  Warnings:

  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `picture_path` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL,
    MODIFY `picture_path` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `picture_path` VARCHAR(255) NULL;
