<script lang="ts">
  export type Paths = {
    name: string;
    link: string;
  }[];

  interface Props {
    paths: Paths;
    current: string;
  }

  const { paths, current }: Props = $props();
</script>

<div class="breadcrumbs text-sm">
  <ul>
    {#each paths as path}
      <li><a href={path.link}>{path.name}</a></li>
    {/each}
    <li>{current}</li>
  </ul>
</div>
