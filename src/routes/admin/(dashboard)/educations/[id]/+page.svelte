<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/input.svelte";
  import Textarea from "$lib/components/textarea.svelte";
  import TagSelector from "$lib/components/tag-selector.svelte";
  import type { PageProps } from "./$types";
  import { DateTime } from "luxon";
  import { page } from '$app/state';

  const { data }: PageProps = $props();
  let saving = $state(false);
</script>

<form
  class="p-4 bg-white space-y-4 w-full"
  method="POST"
  action="/admin/educations/{page.params.id}?/update"
  use:enhance={() => {
    saving = true;
    return async ({ update }) => {
      saving = false;
      await update({ reset: false });
    };
  }}
>
  <h1 class="text-2xl font-bold">Update education</h1>
  <div class="w-full max-w-sm">
    <Input
      name="place"
      label="College"
      type="text"
      value={data.education.place}
      required
    />
    <Input
      name="degree"
      label="Degree"
      type="text"
      value={data.education.degree}
      required
    />
    <Input
      name="gpa"
      label="GPA"
      type="text"
      value={data.education.gpa / 100}
      required
    />
    <Input
      name="start-date"
      label="Start date"
      type="date"
      value={DateTime.fromJSDate(data.education.startDate).toFormat(
        "yyyy-MM-dd",
      )}
      required
    />
    <Input
      name="end-date"
      label="End date"
      type="date"
      value={data.education.endDate &&
        DateTime.fromJSDate(data.education.endDate).toFormat("yyyy-MM-dd")}
    />
    <Textarea
      name="description"
      label="Description"
      value={data.education.description}
    />
    <TagSelector
      label="Skills"
      name="skills"
      list={data.skills}
      active={data.education.EducationSkill.map((e) => e.Skill.id)}
      note="Select any applicable"
    />
  </div>
  <div>
    <a href="/admin/educations" class="btn btn-error">Cancel</a>
    <button class="btn btn-success">{saving ? "Saving" : "Save"}</button>
  </div>
</form>
