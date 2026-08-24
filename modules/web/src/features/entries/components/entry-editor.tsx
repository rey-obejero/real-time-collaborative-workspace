import { useState, useEffect, useCallback } from 'react';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import type { PartialBlock } from '@blocknote/core';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { Input } from '@/components/ui/input';
import { useUpdateEntry } from '@/features/entries/hooks/use-update-entry';

interface EntryEditorProps {
  entryId: string;
  entryType: string;
  initialTitle?: string;
  initialContent?: PartialBlock[];
}

export const EntryEditor = ({
  entryId,
  entryType,
  initialTitle = '',
  initialContent,
}: EntryEditorProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [isDirty, setIsDirty] = useState(false);
  const { mutate: updateEntry } = useUpdateEntry();

  const { audio, file, image, video, ...remainingBlockSpecs } =
    defaultBlockSpecs;

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...remainingBlockSpecs,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    initialContent,
  });

  // Debounced auto-save
  useEffect(() => {
    if (!isDirty || !entryId) {
      return;
    }

    const timeout = setTimeout(() => {
      if (!editor) {
        return;
      }

      updateEntry({
        id: entryId,
        type: entryType,
        title: title || 'Untitled',
        content: JSON.stringify(editor.document),
      });

      setIsDirty(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [title, editor, isDirty, entryId, entryType, updateEntry]);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
    setIsDirty(true);
  }, []);

  // Listen to BlockNote editor changes
  useEffect(() => {
    if (!editor) return;

    const unsubscribe = editor.onChange(() => {
      setIsDirty(true);
    });

    return () => {
      unsubscribe();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className='bg-background flex h-full flex-col overflow-auto selection:bg-zinc-200/60 dark:selection:bg-zinc-800/60'>
      <div className='mx-auto w-full max-w-[740px] flex-1 px-12 pt-24 pb-32'>
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder='Untitled'
          className='text-foreground mb-10 h-auto border-0 bg-transparent px-0 py-0 text-4xl font-extrabold tracking-tight transition-all placeholder:text-zinc-300 focus-visible:ring-0 dark:placeholder:text-zinc-700'
        />

        <BlockNoteView editor={editor} className='w-full' />
      </div>
    </div>
  );
};
