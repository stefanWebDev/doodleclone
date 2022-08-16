-- CreateTable
CREATE TABLE `DataSetName` (
    `id` VARCHAR(191) NOT NULL,
    `nameIsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DataSetName_id_key`(`id`),
    UNIQUE INDEX `DataSetName_nameIsId_key`(`nameIsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `dataSetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DayField` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isSelected` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Date` ADD CONSTRAINT `Date_dataSetId_fkey` FOREIGN KEY (`dataSetId`) REFERENCES `DataSetName`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DayField` ADD CONSTRAINT `DayField_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `Date`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
