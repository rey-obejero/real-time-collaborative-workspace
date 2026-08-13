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
  DropdownMenuSeparator,
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
          <button className='group flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-[#e2e1de] focus:outline-none dark:hover:bg-[#292524]'>
            <img
              src={dicebear(activeWorkspace?.name ?? 'Workspace')}
              alt={activeWorkspace?.name ?? 'Workspace'}
              className='h-5 w-5 rounded'
            />
            <span className='text-foreground flex-1 truncate text-left text-[14px] font-medium'>
              {activeWorkspace?.name ?? 'Select workspace'}
            </span>
            <Icon
              icon='mingcute:down-line'
              className='text-muted-foreground ml-auto h-3 w-3 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180'
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='start'
          sideOffset={4}
          className='!w-[calc(var(--radix-dropdown-menu-trigger-width)+20px)] !overflow-hidden !rounded-md border border-border !bg-background p-1.5 !shadow-[0_2px_8px_rgb(0_0_0/0.06)] !ring-0 dark:!shadow-[0_2px_8px_rgb(0_0_0/0.4)] dark:!ring-0'
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
              className={`cursor-pointer rounded-[4px] px-3 py-1.5 text-[14px] [&_svg]:!size-3.5 ${ws.id === activeWorkspaceId ? 'bg-accent' : ''}`}
            >
              <img
                src={dicebear(ws.name)}
                alt={ws.name}
                className='h-5 w-5 rounded'
              />
              <span className='min-w-0 flex-1 truncate'>{ws.name}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className='mx-1 my-2 h-px bg-border' />

          <DropdownMenuItem
            onClick={() => {}}
            className='text-muted-foreground cursor-pointer rounded-[4px] px-3 py-1.5 text-[14px] [&_svg]:!size-3.5'
          >
            <Icon icon='mingcute:settings-3-line' />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setCreateDialogOpen(true)}
            className='text-muted-foreground cursor-pointer rounded-[4px] px-3 py-1.5 text-[14px] [&_svg]:!size-3.5'
          >
            <Icon icon='mingcute:add-line' />
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
