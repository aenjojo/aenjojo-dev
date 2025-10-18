<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { Eye, EyeOff } from "@lucide/svelte";

  interface Props extends HTMLInputAttributes {
    label: string;
    note?: string;
    hint?: string;
  }

  const { label, note, hint, type, required, ...props }: Props = $props();
  let showText = $state(false);
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">
    {label}{required ? "" : " (optional)"}
  </legend>
  {#if note}
    <p class="label">{note}</p>
  {/if}
  {#if type === "password"}
    <div class="join validator">
      <label class="input validator join-item">
        <input type={showText ? "text" : "password"} {required} {...props} />
      </label>
      <button
        type="button"
        class="btn btn-square join-item"
        onclick={() => (showText = !showText)}
      >
        {#if showText}
          <EyeOff class="inline-block size-4" />
        {:else}
          <Eye class="inline-block size-4" />
        {/if}
      </button>
    </div>
  {:else}
    <label class="input validator join-item">
      <input {type} {required} {...props} />
    </label>
  {/if}
  {#if hint}
    <p class="validator-hint hidden">{hint}</p>
  {/if}
</fieldset>
