<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends HTMLInputAttributes {
    label: string;
  }

  const { id, label, type, ...props }: Props = $props();
  let showText = $state(false);
</script>

<div class="flex flex-col max-w-80">
  <label for={id}>{label}</label>
  <div class="flex w-full border border-blue-200 rounded-md overflow-hidden">
    <input
      {id}
      type={type === "password" ? (!showText ? "password" : "text") : type}
      class="px-1.5 h-8 w-full {type === 'password' ? 'rounded-l-md' : 'rounded-md'}"
      {...props}
    />
    {#if type === "password"}
      <button
        type="button"
        class="w-8 h-8 bg-blue-200"
        onclick={() => (showText = !showText)}
      >
        {showText ? "A" : "#"}
      </button>
    {/if}
  </div>
</div>
