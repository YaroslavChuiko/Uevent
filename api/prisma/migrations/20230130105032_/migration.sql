/*
  Warnings:

  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `is_confirmed` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `is_confirmed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
