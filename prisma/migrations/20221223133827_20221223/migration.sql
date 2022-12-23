/*
  Warnings:

  - The primary key for the `karyawan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `karyawan` table. All the data in the column will be lost.
  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nik]` on the table `karyawan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `karyawan` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- AlterTable
ALTER TABLE `session` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- CreateIndex
CREATE UNIQUE INDEX `karyawan_nik_key` ON `karyawan`(`nik`);
