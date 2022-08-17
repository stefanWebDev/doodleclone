/*
  Warnings:

  - The primary key for the `date` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `date` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Date` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateIsId` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dayfield` DROP FOREIGN KEY `DayField_dateId_fkey`;

-- AlterTable
ALTER TABLE `date` DROP PRIMARY KEY,
    DROP COLUMN `date`,
    ADD COLUMN `dateIsId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `dayfield` MODIFY `dateId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Date_id_key` ON `Date`(`id`);

-- AddForeignKey
ALTER TABLE `DayField` ADD CONSTRAINT `DayField_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `Date`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
