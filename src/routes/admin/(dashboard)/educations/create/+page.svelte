<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/input.svelte";
  import Textarea from "$lib/components/textarea.svelte";
  import TagSelector from "$lib/components/tag-selector.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  let saving = $state(false);
</script>

<form
  class="p-4 bg-white space-y-4 w-full"
  method="POST"
  action="/admin/educations/create?/create"
  use:enhance={() => {
    saving = true;
    return async ({ update }) => {
      saving = false;
      await update();
    };
  }}
>
  <h1 class="text-2xl font-bold">Add new education</h1>
  <div class="w-full max-w-sm">
    <Input name="place" label="College" type="text" value="" required />
    <Input name="degree" label="Degree" type="text" value="" required />
    <Input name="gpa" label="GPA" type="text" value="" required />
    <Input name="start-date" label="Start date" type="date" value="" required />
    <Input name="end-date" label="End date" type="date" value="" />
    <Textarea name="description" label="Description" value="" />
    <TagSelector
      label="Skills"
      name="skills"
      list={data.skills}
      note="Select any applicable"
    />
  </div>
  <div>
    <a href="/admin/educations" class="btn btn-error">Back</a>
    <button class="btn btn-success">{saving ? "Adding" : "Add"}</button>
  </div>
</form>
