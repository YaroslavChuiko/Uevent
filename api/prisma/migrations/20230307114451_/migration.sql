/*
  Warnings:

  - You are about to alter the column `longitude` on the `company` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,5)` to `Decimal(8,5)`.
  - You are about to alter the column `date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `price` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(7,2)`.
  - You are about to alter the column `longitude` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,5)` to `Decimal(8,5)`.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `longitude` DECIMAL(8, 5) NOT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `date` TIMESTAMP NOT NULL,
    MODIFY `price` DECIMAL(7, 2) NOT NULL,
    MODIFY `longitude` DECIMAL(8, 5) NOT NULL;
