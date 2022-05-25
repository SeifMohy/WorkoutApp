/*
  Warnings:

  - The primary key for the `Excercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Excercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.
  - You are about to alter the column `videoUrl` on the `Excercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(25)`.
  - You are about to alter the column `description` on the `Excercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(250)`.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WorkoutLine` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- DropForeignKey
ALTER TABLE "UserLog" DROP CONSTRAINT "UserLog_workoutLineId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLine" DROP CONSTRAINT "WorkoutLine_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLine" DROP CONSTRAINT "WorkoutLine_workoutId_fkey";

-- AlterTable
ALTER TABLE "Excercise" DROP CONSTRAINT "Excercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "videoUrl" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(250),
ADD CONSTRAINT "Excercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Excercise_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "UserLog" DROP CONSTRAINT "UserLog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workoutLineId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserLog_id_seq";

-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Workout_id_seq";

-- AlterTable
ALTER TABLE "WorkoutLine" DROP CONSTRAINT "WorkoutLine_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ALTER COLUMN "workoutId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WorkoutLine_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WorkoutLine_id_seq";

-- AddForeignKey
ALTER TABLE "WorkoutLine" ADD CONSTRAINT "WorkoutLine_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLine" ADD CONSTRAINT "WorkoutLine_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Excercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_workoutLineId_fkey" FOREIGN KEY ("workoutLineId") REFERENCES "WorkoutLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
