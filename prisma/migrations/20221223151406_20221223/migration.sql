-- DropForeignKey
ALTER TABLE `karyawan` DROP FOREIGN KEY `Karyawan_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_id_user_fkey`;

-- AddForeignKey
ALTER TABLE `karyawan` ADD CONSTRAINT `Karyawan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
