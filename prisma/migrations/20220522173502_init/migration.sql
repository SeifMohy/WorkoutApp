/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "firstName" VARCHAR(25) NOT NULL,
ADD COLUMN     "gender" BOOLEAN NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "lastName" VARCHAR(25) NOT NULL,
ADD COLUMN     "password" VARCHAR(50) NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50);

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Excercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "videoUrl" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "Excercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLine" (
    "id" SERIAL NOT NULL,
    "recWeight" INTEGER NOT NULL,
    "recSets" INTEGER NOT NULL,
    "recReps" INTEGER NOT NULL,
    "steps" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLog" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "workoutLineId" INTEGER NOT NULL,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutLine" ADD CONSTRAINT "WorkoutLine_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLine" ADD CONSTRAINT "WorkoutLine_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Excercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_workoutLineId_fkey" FOREIGN KEY ("workoutLineId") REFERENCES "WorkoutLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
