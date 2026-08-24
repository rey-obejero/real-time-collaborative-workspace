import { entriesApi } from '../api/entries-api';
import { ENTRY_QUERY_KEY } from './use-entry';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: entriesApi.updateEntry,
    onSuccess: (updatedEntry) => {
      queryClient.invalidateQueries({
        queryKey: [...ENTRY_QUERY_KEY, updatedEntry.id],
      });
    },
  });
};
