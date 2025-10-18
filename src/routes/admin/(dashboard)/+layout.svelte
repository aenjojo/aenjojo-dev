<script lang="ts">
  import {
    type IconProps,
    PanelLeftOpen,
    LogOut,
    House,
    CircleUserRound,
    GraduationCap,
    BriefcaseBusiness,
    LayoutTemplate,
    Brush,
    Link,
    MessageCircle,
    Newspaper,
  } from "@lucide/svelte";
  import type { Component } from "svelte";
  import { outerWidth } from "svelte/reactivity/window";

  const openDrawer = outerWidth.current
    ? outerWidth.current < 640
      ? false
      : true
    : false;
  const { children } = $props();
</script>

<div class="drawer drawer-open">
  <input
    id="side-drawer"
    type="checkbox"
    class="drawer-toggle"
    checked={openDrawer}
  />
  <div class="drawer-content">
    {@render children()}
  </div>
  <div class="drawer-side is-drawer-close:overflow-visible">
    <label for="side-drawer" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <div
      class="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full"
    >
      <ul class="menu bg-base-200 text-base-content min-h-full w-full grow">
        {@render menuLink("/admin/welcome", "Welcome", House)}
        {@render menuLink("/admin/about", "About", CircleUserRound)}
        {@render menuLink("/admin/educations", "Education", GraduationCap)}
        {@render menuLink(
          "/admin/experiences",
          "Experience",
          BriefcaseBusiness,
        )}
        {@render menuLink("/admin/projects", "Project", LayoutTemplate)}
        {@render menuLink("/admin/skills", "Skill", Brush)}
        {@render menuLink("/admin/links", "Link Shortener", Link)}
        {@render menuLink("/admin/socials", "Social Network", MessageCircle)}
        {@render menuLink("/admin/articles", "Article", Newspaper)}
      </ul>
      <div
        class="flex is-drawer-open:w-full is-drawer-open:sm:flex-row-reverse is-drawer-open:justify-between is-drawer-close:flex-col"
      >
        <form
          class="m-2 bg-base-200 text-base-content"
          action="/admin/auth?/logout"
          method="POST"
        >
          <button
            class="btn btn-ghost btn-error is-drawer-close:btn-square is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Logout"
          >
            <LogOut class="inline-block size-4 my-1.5" />
            <span class="is-drawer-close:hidden whitespace-nowrap">
              Log out
            </span>
          </button>
        </form>
        <div
          class="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right hidden sm:block"
          data-tip="Open"
        >
          <label
            for="side-drawer"
            class="btn btn-ghost btn-square drawer-button is-drawer-open:rotate-y-180"
          >
            <PanelLeftOpen class="inline-block size-4 my-1.5" />
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

{#snippet menuLink(
  menuPath: string,
  menuTitle: string,
  Icon: Component<IconProps>,
)}
  <li>
    <a
      href={menuPath}
      class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
      data-tip={menuTitle}
    >
      <Icon class="inline-block size-4 my-1.5" />
      <span class="is-drawer-close:hidden whitespace-nowrap">{menuTitle}</span>
    </a>
  </li>
{/snippet}
