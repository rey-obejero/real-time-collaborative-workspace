export type SchemaId = "page" | "task" | "project" | "note" | "bookmark";

export type EntryStatus =
  | "draft"
  | "published"
  | "todo"
  | "doing"
  | "done"
  | "blocked"
  | "planning"
  | "active";

export interface Schema {
  id: SchemaId;
  name: string;
  color: string;
  description: string;
}

export interface Entry {
  id: string;
  type: SchemaId;
  title: string;
  status?: EntryStatus;
  pinned?: boolean;
  tags: string[];
  updatedAt: Date;
  content?: string;
  priority?: string;
  due?: string;
  assignee?: string;
  owner?: string;
  start?: string;
  end?: string;
  url?: string;
  description?: string;
}

export interface DiscussionMessage {
  sender: string;
  text: string;
}

export interface Discussion {
  id: number;
  title: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: DiscussionMessage[];
}

export interface Member {
  name: string;
  email: string;
  initials: string;
  role: string;
}
