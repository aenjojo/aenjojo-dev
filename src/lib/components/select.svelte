<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  interface Props extends HTMLSelectAttributes {
    label: string;
    note?: string;
    options: string[];
  }

  const { label, note, required, options, ...props }: Props = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">
    {label}{required ? "" : " (optional)"}
  </legend>
  {#if note}
    <p class="label">{note}</p>
  {/if}
  <select class="select capitalize" {...props}>
    <option disabled selected>Select {label.toLowerCase()}</option>
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</fieldset>
