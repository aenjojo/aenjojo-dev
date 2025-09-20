<script lang="ts">
const { children } = $props();
const year = new Date().getFullYear();
</script>

<header class="w-full font-sans bg-blue-500">
  <div class="w-full lg:w-4xl mx-auto px-4">
    AJ48
  </div>
</header>
<main class="w-full font-sans bg-slate-50">
  {@render children()}
</main>
<footer class="w-full font-sans bg-blue-500">
  <div class="w-full lg:w-4xl mx-auto px-4">
    <div class="flex gap-4 justify-center">
      <a href="/resume/projects">Projects</a>
      <a href="https://comia.id/u/aenjojo">Writings</a>
    </div>
    <div class="text-center">
      &copy; {year} aenjojo
    </div>
  </div>
</footer>
