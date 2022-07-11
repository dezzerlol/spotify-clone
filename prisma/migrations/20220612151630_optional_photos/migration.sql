-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "photo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "photo" DROP NOT NULL;
