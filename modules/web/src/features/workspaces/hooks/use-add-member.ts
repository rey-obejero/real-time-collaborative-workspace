import { useMutation } from '@tanstack/react-query';
import { workspaceApi } from '../api/workspace-api';
import type { AddWorkspaceMemberRequest } from '../types/workspaces.types';

export const useAddMember = () => {
  return useMutation({
    mutationFn: ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: AddWorkspaceMemberRequest;
    }) => workspaceApi.addMember(workspaceId, data),
  });
};
