/*
  Warnings:

  - You are about to drop the column `tickets_limit` on the `event` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `tickets_available` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `tickets_limit`,
    ADD COLUMN `tickets_available` INTEGER NOT NULL,
    MODIFY `date` TIMESTAMP NOT NULL;
