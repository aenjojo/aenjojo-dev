<script lang="ts">
  import { DateTime } from "luxon";
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";

  const { data }: PageProps = $props();
</script>

<div class="p-4 bg-white space-y-4 w-full">
  <h1 class="text-2xl">Educations</h1>
  <div
    class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100"
  >
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>College</th>
          <th>Degree</th>
          <th>Grade</th>
          <th>Enrolled on</th>
          <th>Graduated on</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each data.educations as edu, index}
          <tr>
            <td>{index + 1}</td>
            <td>{edu.place}</td>
            <td>{edu.degree}</td>
            <td>{edu.gpa / 100}</td>
            <td>
              {DateTime.fromJSDate(edu.startDate).toFormat("dd LLL yyyy")}
            </td>
            <td>
              {edu.endDate
                ? DateTime.fromJSDate(edu.endDate).toFormat("dd LLL yyyy")
                : "Present"}
            </td>
            <td>
              <a
                href="/admin/educations/{edu.id}"
                class="btn btn-soft btn-primary"
              >
                Edit
              </a>
              <form
                method="POST"
                action="/admin/educations?/delete"
                use:enhance={({ formData }) => {
                  formData.set("id", edu.id);
                }}
                class="inline"
              >
                <button class="btn btn-soft btn-error">Delete</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <a href="/admin/educations/create" class="btn btn-soft btn-primary">
    Add one
  </a>
</div>
