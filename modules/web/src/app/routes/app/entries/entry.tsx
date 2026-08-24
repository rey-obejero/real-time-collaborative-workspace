import { useParams } from 'react-router-dom';
import { EntryEditor } from '@/features/entries/components/entry-editor';
import { useEntry } from '@/features/entries/hooks/use-entry';
import { Skeleton } from '@/components/ui/skeleton';

export const EntryRoute = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const { data: entry, isLoading } = useEntry(entryId);

  if (!entryId) return null;
  if (isLoading) return <Skeleton className='h-full w-full' />;
  if (!entry) return <div>Entry not found</div>;

  return (
    <EntryEditor
      key={entry.id}
      entryId={entry.id}
      entryType={entry.type}
      initialTitle={entry.title}
      initialContent={entry.content ? JSON.parse(entry.content) : undefined}
    />
  );
};
