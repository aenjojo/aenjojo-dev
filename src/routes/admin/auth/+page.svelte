<script lang="ts">
  import Input from "$lib/components/input.svelte";
  import type { PageProps } from "./$types";

  const { form }: PageProps = $props();
</script>

<main class="w-screen h-screen bg-blue-200 grid place-items-center">
  <form
    method="POST"
    action="/admin/auth?/login"
    class="bg-white p-8 w-96 rounded-lg space-y-4"
  >
    <Input
      name="username"
      label="Username"
      type="text"
      value={form?.username ?? ""}
      required
    />
    <Input name="password" label="Password" type="password" required />
    {#if form?.missing}
      <p>Username or password is missing</p>
    {/if}
    {#if form?.incorrect}
      <p>Username or password is incorrect</p>
    {/if}
    <button class="bg-blue-200 rounded-md w-full px-4 py-2">Login</button>
  </form>
</main>
