-- CreateTable
CREATE TABLE `landmark` (
    `land_id` INTEGER NOT NULL,
    `label` VARCHAR(50) NULL,
    `nama` VARCHAR(50) NULL,
    `lat` FLOAT NULL,
    `lon` FLOAT NULL,
    `category` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `price` INTEGER NULL,
    `rating` INTEGER NULL,
    `description` TEXT NULL,
    `Img_Url` TEXT NULL,

    PRIMARY KEY (`land_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wisata` (
    `place_id` INTEGER NOT NULL,
    `land_id` INTEGER NULL,
    `nama` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `provinsi` VARCHAR(50) NULL,
    `lat` FLOAT NULL,
    `lon` FLOAT NULL,
    `distance` FLOAT NULL,
    `category` VARCHAR(50) NULL,
    `price` INTEGER NULL,
    `rating` INTEGER NULL,
    `description` TEXT NULL,
    `Img_Url` TEXT NULL,

    INDEX `land_id`(`land_id`),
    PRIMARY KEY (`place_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wisata` ADD CONSTRAINT `wisata_ibfk_1` FOREIGN KEY (`land_id`) REFERENCES `landmark`(`land_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
