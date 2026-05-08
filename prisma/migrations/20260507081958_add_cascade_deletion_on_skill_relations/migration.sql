-- DropForeignKey
ALTER TABLE "public"."education_skills" DROP CONSTRAINT "education_skills_education_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."education_skills" DROP CONSTRAINT "education_skills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."experience_skills" DROP CONSTRAINT "experience_skills_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."experience_skills" DROP CONSTRAINT "experience_skills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_stacks" DROP CONSTRAINT "project_stacks_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_stacks" DROP CONSTRAINT "project_stacks_stack_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."experience_skills" ADD CONSTRAINT "experience_skills_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."experience_skills" ADD CONSTRAINT "experience_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."education_skills" ADD CONSTRAINT "education_skills_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "public"."educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."education_skills" ADD CONSTRAINT "education_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_stacks" ADD CONSTRAINT "project_stacks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_stacks" ADD CONSTRAINT "project_stacks_stack_id_fkey" FOREIGN KEY ("stack_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
