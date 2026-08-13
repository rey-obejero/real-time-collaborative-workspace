import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useWorkspaces } from '../hooks/use-workspaces';
import { useWorkspace } from '../hooks/use-workspace';
import { CreateWorkspaceDialog } from './create-workspace-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const dicebear = (seed: string) =>
  `https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt:1&lettersVariant=single:0&backgroundColor=000000&textColor=ffffff&seed=${encodeURIComponent(seed)}`;

export function WorkspaceSwitcher() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data: workspaces, isLoading } = useWorkspaces();
  const { activeWorkspace, selectWorkspace, activeWorkspaceId } =
    useWorkspace();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors focus:outline-none'>
            <img
              src={dicebear(activeWorkspace?.name ?? 'Workspace')}
              alt={activeWorkspace?.name ?? 'Workspace'}
              className='h-5 w-5 rounded'
            />
            <span className='text-foreground flex-1 truncate text-left text-sm font-medium'>
              {activeWorkspace?.name ?? 'Select workspace'}
            </span>
            <Icon icon='mingcute:down-line' className='text-muted-foreground ml-auto h-3 w-3 shrink-0' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='start'
          sideOffset={4}
          className='border-border overflow-hidden rounded-md bg-background p-1.5 shadow-[0_2px_8px_rgb(0_0_0/0.06)] dark:shadow-[0_2px_8px_rgb(0_0_0/0.4)] w-[calc(100%+20px)]'
        >
          {isLoading && (
            <div className='space-y-0.5 p-1'>
              <Skeleton className='h-9 w-full rounded-[4px]' />
              <Skeleton className='h-9 w-full rounded-[4px]' />
            </div>
          )}

          {workspaces?.map((ws) => (
            <DropdownMenuItem
              key={ws.id}
              onClick={() => {
                selectWorkspace(ws);
                navigate(`/w/${ws.id}`);
              }}
              className={`flex cursor-pointer items-center gap-2.5 rounded-[4px] px-3 py-1.5 text-sm ${ws.id === activeWorkspaceId ? 'bg-accent' : ''}`}
            >
              <img src={dicebear(ws.name)} alt={ws.name} className='h-5 w-5 rounded' />
              <span className='min-w-0 flex-1 truncate'>{ws.name}</span>
            </DropdownMenuItem>
          ))}

          <div className='bg-border mx-1 my-2 h-px' />

          <DropdownMenuItem
            className='text-muted-foreground flex cursor-pointer items-center gap-2.5 rounded-[4px] px-3 py-1.5 text-sm'
            onSelect={() => {}}
          >
            <Icon icon='mingcute:settings-3-line' className='h-3.5 w-3.5' />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-muted-foreground flex cursor-pointer items-center gap-2.5 rounded-[4px] px-3 py-1.5 text-sm'
            onSelect={() => setCreateDialogOpen(true)}
          >
            <Icon icon='mingcute:add-line' className='h-3.5 w-3.5' />
            <span>New Workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}
