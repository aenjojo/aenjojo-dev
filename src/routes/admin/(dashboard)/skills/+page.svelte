<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/input.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  let saving = $state(false);
</script>

<div class="p-4 bg-white space-y-4 w-full">
  <h1 class="text-2xl">Skills</h1>
  <div class="grid grid-cols-6">
    <div
      class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 col-span-4"
    >
      <table class="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.skills as skill, index}
            <tr>
              <td class="font-bold text-center">{index + 1}</td>
              <td>{skill.id}</td>
              <td>{skill.name}</td>
              <td class="text-center">
                <form method="POST" action="/admin/skills?/delete" use:enhance={({formData}) => {
                  formData.set('id', skill.id);
                }}>
                  <button class="btn btn-sm btn-soft btn-error">Delete</button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <form
      class="p-4 space-y-4 w-full col-span-2"
      method="POST"
      action="/admin/skills?/create"
      use:enhance={() => {
        saving = true;
        return async ({ update }) => {
          saving = false;
          await update();
        };
      }}
    >
      <div class="w-full max-w-xs sticky top-0">
        <Input name="name" label="Skill name" type="text" value="" required />
        <button class="btn btn-success">{saving ? "Adding" : "Add"}</button>
      </div>
    </form>
  </div>
</div>
