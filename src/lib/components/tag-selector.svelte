<script lang="ts">
  interface Props {
    label: string;
    note?: string;
    name: string;
    list: string[];
  }

  const { label, note, name, list }: Props = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{label}</legend>
  {#if note}
    <p class="label">{note}</p>
  {/if}
  <div class="flex flex-wrap gap-0.5">
    {#each list as item}
      <input class="btn" type="checkbox" {name} aria-label={item} />
    {/each}
  </div>
</fieldset>
