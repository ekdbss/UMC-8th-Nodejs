/*
  Warnings:

  - Made the column `rating` on table `store` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `store` MODIFY `rating` FLOAT NOT NULL;
