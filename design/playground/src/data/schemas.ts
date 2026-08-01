import type { Schema } from "./types";

export const schemas: Schema[] = [
  {
    id: "page",
    name: "Page",
    color: "page",
    description: "Long-form documents",
  },
  { id: "task", name: "Task", color: "task", description: "Action items" },
  {
    id: "project",
    name: "Project",
    color: "project",
    description: "Container for related objects",
  },
  { id: "note", name: "Note", color: "note", description: "Quick capture" },
  {
    id: "bookmark",
    name: "Bookmark",
    color: "bookmark",
    description: "Saved URLs",
  },
];
