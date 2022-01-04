-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "movie" TEXT NOT NULL,
    "user_fk" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_fk_fkey" FOREIGN KEY ("user_fk") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
