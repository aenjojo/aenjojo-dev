-- CreateEnum
CREATE TYPE "public"."WorkType" AS ENUM ('onsite', 'hybrid', 'remote');

-- CreateEnum
CREATE TYPE "public"."WorkTime" AS ENUM ('fulltime', 'parttime', 'freelance', 'contract');

-- CreateTable
CREATE TABLE "public"."links" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."About" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."socials" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."experiences" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "work_type" "public"."WorkType" NOT NULL,
    "work_time" "public"."WorkTime" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "descriptions" TEXT[],

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."experience_skills" (
    "experience_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,

    CONSTRAINT "experience_skills_pkey" PRIMARY KEY ("experience_id","skill_id")
);

-- CreateTable
CREATE TABLE "public"."educations" (
    "id" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "gpa" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "descriptions" TEXT[],

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."education_skills" (
    "education_id" TEXT NOT NULL,
    "skill_id" TEXT NOT NULL,

    CONSTRAINT "education_skills_pkey" PRIMARY KEY ("education_id","skill_id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "detail" JSONB NOT NULL,
    "image_url" TEXT,
    "repo_url" TEXT,
    "demo_url" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_stacks" (
    "project_id" TEXT NOT NULL,
    "stack_id" TEXT NOT NULL,

    CONSTRAINT "project_stacks_pkey" PRIMARY KEY ("project_id","stack_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "links_code_key" ON "public"."links"("code");

-- CreateIndex
CREATE UNIQUE INDEX "socials_code_key" ON "public"."socials"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "public"."Project"("code");

-- AddForeignKey
ALTER TABLE "public"."experience_skills" ADD CONSTRAINT "experience_skills_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."experience_skills" ADD CONSTRAINT "experience_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."education_skills" ADD CONSTRAINT "education_skills_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "public"."educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."education_skills" ADD CONSTRAINT "education_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_stacks" ADD CONSTRAINT "project_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_stacks" ADD CONSTRAINT "project_stacks_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "public"."skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
