/*
  Warnings:

  - Added the required column `avatar` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "avatar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "photo" TEXT NOT NULL;
