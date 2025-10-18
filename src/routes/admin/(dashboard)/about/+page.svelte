<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import Textarea from "$lib/components/textarea.svelte";
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  let saving = $state(false);
</script>

<form
  class="p-4 bg-white space-y-4 w-full"
  method="POST"
  use:enhance={() => {
    saving = true;
    return async () => {
      saving = false;
    };
  }}
>
  <h1 class="text-2xl font-bold">About me</h1>
  <div class="w-full max-w-xs">
    <Input name="name" label="Name" type="text" value={data.name} required />
    <Input name="role" label="Role" type="text" value={data.role} />
    <Textarea name="summary" label="Summary" value={data.summary} />
  </div>
  <button class="btn btn-success">{saving ? "Saving" : "Save"}</button>
</form>
