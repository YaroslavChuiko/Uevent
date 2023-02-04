/*
  Warnings:

  - You are about to drop the column `location` on the `company` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `latitude` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `location`,
    ADD COLUMN `latitude` DECIMAL(7, 5) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(7, 5) NOT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL;
