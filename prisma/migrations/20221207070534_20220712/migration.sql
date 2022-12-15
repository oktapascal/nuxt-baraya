-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_id_karyawan_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `id_karyawan` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_karyawan_fkey` FOREIGN KEY (`id_karyawan`) REFERENCES `Karyawan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
