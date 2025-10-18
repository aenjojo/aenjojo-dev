/*
  Warnings:

  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."project_stacks" DROP CONSTRAINT "project_stacks_project_id_fkey";

-- DropTable
DROP TABLE "public"."About";

-- DropTable
DROP TABLE "public"."Project";

-- CreateTable
CREATE TABLE "public"."about" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "detail" JSONB NOT NULL,
    "image_url" TEXT,
    "repo_url" TEXT,
    "demo_url" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_code_key" ON "public"."projects"("code");

-- AddForeignKey
ALTER TABLE "public"."project_stacks" ADD CONSTRAINT "project_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
