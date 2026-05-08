<script lang="ts">
  interface Props {
    label: string;
    note?: string;
    name: string;
    list: {
      label: string;
      value: string;
    }[];
    active?: string[];
  }

  const { label, note, name, list, active }: Props = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{label}</legend>
  {#if note}
    <p class="label">{note}</p>
  {/if}
  <div class="flex flex-wrap gap-0.5">
    {#each list as item}
      <input
        class="btn"
        type="checkbox"
        aria-label={item.label}
        value={item.value}
        checked={active ? active.includes(item.value) : false}
        {name}
      />
    {/each}
  </div>
</fieldset>
