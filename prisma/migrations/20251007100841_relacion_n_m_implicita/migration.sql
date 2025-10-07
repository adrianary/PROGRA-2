/*
  Warnings:

  - You are about to drop the `tareasetiquetas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tareasetiquetas` DROP FOREIGN KEY `TareasEtiquetas_etiquetaId_fkey`;

-- DropForeignKey
ALTER TABLE `tareasetiquetas` DROP FOREIGN KEY `TareasEtiquetas_tareaId_fkey`;

-- DropTable
DROP TABLE `tareasetiquetas`;

-- CreateTable
CREATE TABLE `_TareasEtiquetas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TareasEtiquetas_AB_unique`(`A`, `B`),
    INDEX `_TareasEtiquetas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TareasEtiquetas` ADD CONSTRAINT `_TareasEtiquetas_A_fkey` FOREIGN KEY (`A`) REFERENCES `Etiqueta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TareasEtiquetas` ADD CONSTRAINT `_TareasEtiquetas_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tarea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
