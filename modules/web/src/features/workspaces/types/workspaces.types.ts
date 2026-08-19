export type CreateWorkspaceRequest = {
  name: string;
};

export type AddWorkspaceMemberRequest = {
  email: string;
  role: string;
};

export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: string;
};
