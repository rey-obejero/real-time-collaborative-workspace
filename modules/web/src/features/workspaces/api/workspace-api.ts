import type { Workspace } from '@/types/api';
import { apiClient } from '@/lib/api-client';
import type {
  AddWorkspaceMemberRequest,
  CreateWorkspaceRequest,
  WorkspaceMember,
} from '../types/workspaces.types';

const API_WORKSPACE_URL = '/workspaces';

export const workspaceApi = {
  createWorkspace: async (data: CreateWorkspaceRequest): Promise<Workspace> => {
    const response = await apiClient.post('/workspaces', data);
    return response.data;
  },

  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>(API_WORKSPACE_URL);
    return response.data;
  },

  getWorkspace: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>(
      `${API_WORKSPACE_URL}/${id}`,
    );
    return response.data;
  },

  addMember: async (
    workspaceId: string,
    data: AddWorkspaceMemberRequest,
  ): Promise<WorkspaceMember> => {
    const response = await apiClient.post<WorkspaceMember>(
      `${API_WORKSPACE_URL}/${workspaceId}/members`,
      data,
    );
    return response.data;
  },
};
