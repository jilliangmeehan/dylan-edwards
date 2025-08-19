import type { Project } from "../types/project";

export const CATEGORIES = {
  some: "some",
  all: "all",
  commercial: "commercial",
  mv: "music video",
  narrative: "narrative",
} as const;

export type Category = keyof typeof CATEGORIES;

interface Project {
  categories?: string;
  [key: string]: any;
}

export function filterProjects(category: Category, projects: Project[]) {
  console.log("Filtering for category:", category);
  console.log("Available projects:", projects);

  if (category === "all") {
    return projects;
  }

  const filtered = projects.filter((project) => {
    const projectCategories =
      project.categories?.toLowerCase().split(" ") || [];
    console.log("Project categories:", projectCategories);

    if (category === "some") {
      return projectCategories.some((cat) => cat === "some");
    }

    return (
      projectCategories.includes(category) ||
      projectCategories.includes(`some ${category}`)
    );
  });

  console.log("Filtered projects:", filtered);
  return filtered;
}

export function dispatchCategoryChange(category: Category) {
  document.dispatchEvent(
    new CustomEvent("categoryChanged", {
      detail: { category },
    }),
  );
}

export function dispatchProjectsFiltered(projects: Project[]) {
  document.dispatchEvent(
    new CustomEvent("projectsFiltered", {
      detail: { projects },
    }),
  );
}
