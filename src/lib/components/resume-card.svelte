<script lang="ts">
  interface ResumeData {
    placeName: string;
    startDate: string;
    endDate: string;
    descriptions: string[];
    skills: string[];
  }

  interface Job extends ResumeData {
    type: "job";
    workType: string;
    workTime: string;
    role: string;
  }

  interface Study extends ResumeData {
    type: "study";
    degree: string;
  }

  type Props = Job | Study;

  const props: Props = $props();
</script>

<div>
  <div class="flex justify-between items-baseline gap-2 capitalize">
    <div class="text-lg font-bold">
      {props.placeName}
    </div>
    {#if props.type === "job"}
      <div class="flex-auto flex gap-2 text-sm">
        <span class="border border-blue-200 rounded px-1">
          {props.workType}
        </span>
        <span class="border border-blue-200 rounded px-1">
          {props.workTime}
        </span>
      </div>
    {/if}
    <div>{props.startDate} - {props.endDate}</div>
  </div>
  <p>
    {props.type === "job" ? props.role : props.degree}
  </p>
  <ul class="list-disc list-outside mt-2 ml-5">
    {#each props.descriptions as description}
      <li>
        {description}
      </li>
    {/each}
  </ul>
  <ul class="flex flex-wrap gap-2 text-sm mt-2">
    {#each props.skills as skill}
      <li class="border border-blue-200 rounded px-1">
        {skill}
      </li>
    {/each}
  </ul>
</div>
