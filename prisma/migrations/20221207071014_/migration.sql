/*
  Warnings:

  - You are about to drop the column `id_karyawan` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Karyawan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Karyawan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_id_karyawan_fkey`;

-- AlterTable
ALTER TABLE `karyawan` ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `id_karyawan`;

-- CreateIndex
CREATE UNIQUE INDEX `Karyawan_id_user_key` ON `Karyawan`(`id_user`);

-- AddForeignKey
ALTER TABLE `Karyawan` ADD CONSTRAINT `Karyawan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
