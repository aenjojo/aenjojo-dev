<script lang="ts">
  import ResumeCard from "$lib/components/resume-card.svelte";
  import { DateTime } from "luxon";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<article class="space-y-8 w-full sm:w-5/6 md:w-4/6 lg:w-3/6 my-8 mx-auto">
  <div>
    <h1 class="text-2xl font-bold">{data.name}</h1>
    <p>{data.role}</p>
    <ul>
      <li>Social</li>
    </ul>
  </div>
  <section>
    <h2 class="text-2xl font-bold">About me</h2>
    <p>{data.summary}</p>
  </section>
  <section>
    <h2 class="text-2xl font-bold">Work experiences</h2>
    <div class="mt-2 space-y-6">
      {#each data.experiences as exp}
        <ResumeCard
          type="job"
          placeName={exp.place}
          role={exp.role}
          workType={exp.workType}
          workTime={exp.workTime}
          startDate={DateTime.fromJSDate(exp.startDate).toFormat("LLL yyyy")}
          endDate={exp.endDate
            ? DateTime.fromJSDate(exp.endDate).toFormat("LLL yyyy")
            : "present"}
          descriptions={exp.description}
          skills={exp.skills}
        />
      {/each}
    </div>
  </section>
  <section>
    <h2 class="text-2xl font-bold">Educations</h2>
    <div class="mt-2 space-y-6">
      {#each data.educations as edu}
        <ResumeCard
          type="study"
          placeName={edu.place}
          degree={edu.degree}
          startDate={DateTime.fromJSDate(edu.startDate).toFormat("LLL yyyy")}
          endDate={edu.endDate
            ? DateTime.fromJSDate(edu.endDate).toFormat("LLL yyyy")
            : "present"}
          descriptions={edu.description}
          skills={edu.skills}
        />
      {/each}
    </div>
  </section>
  <section>
    <h2 class="text-2xl font-bold">Skills</h2>
    <ul class="mt-2">
      <li>next</li>
    </ul>
  </section>
  <section>
    <h2 class="text-2xl font-bold">Projects</h2>
    <div class="mt-2"></div>
  </section>
</article>
