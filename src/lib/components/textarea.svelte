<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends HTMLTextareaAttributes {
    label: string;
    note?: string;
    hint?: string;
  }

  const { label, note, hint, required, ...props }: Props = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">
    {label}{required ? "" : " (optional)"}
  </legend>
  {#if note}
    <p class="label">{note}</p>
  {/if}
  <textarea class="textarea h-24 validator" {required} {...props}></textarea>
  {#if hint}
    <p class="validator-hint">{hint}</p>
  {/if}
</fieldset>
