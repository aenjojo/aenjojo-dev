-- CreateEnum
CREATE TYPE "public"."SkillType" AS ENUM ('language', 'utility', 'technology');

-- AlterTable
ALTER TABLE "public"."skills" ADD COLUMN     "type" "public"."SkillType";
