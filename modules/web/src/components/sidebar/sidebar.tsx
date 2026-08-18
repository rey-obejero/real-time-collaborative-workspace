import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SidebarHeader } from './sidebar-header';
import { SidebarFooter } from './sidebar-footer';

import { useWorkspace } from '@/features/workspaces/hooks/use-workspace';
import { useCreateEntry } from '@/features/entries/hooks/use-create-entry';

const SCHEMAS = [
  { id: 'page', name: 'Page', icon: 'mingcute:document-line' },
  { id: 'task', name: 'Task', icon: 'mingcute:task-line' },
  { id: 'project', name: 'Project', icon: 'mingcute:folder-line' },
  { id: 'note', name: 'Note', icon: 'mingcute:notebook-line' },
  { id: 'bookmark', name: 'Bookmark', icon: 'mingcute:bookmark-line' },
] as const;

const COLLECTIONS = [
  { name: 'Personal', icon: 'mingcute:user-3-line' },
  { name: 'Work', icon: 'mingcute:briefcase-2-line' },
] as const;

const NAV_ICON_SIZE = 'size-3.5';

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { activeWorkspaceId } = useWorkspace();
  const { mutate: createEntry } = useCreateEntry();

  const activeSchema = new URLSearchParams(search).get('schema');
  const isActiveRow = (name: string) => activeSchema === name;
  const isEntriesView = /^\/w\/[^/]+\/entries\/?$/.test(pathname);

  const goToSchema = (name: string) => {
    if (!activeWorkspaceId) return;
    navigate(`/w/${activeWorkspaceId}/entries?schema=${name}`);
  };

  const handleCreateEntry = (type: string) => {
    if (!activeWorkspaceId) return;

    createEntry(
      {
        workspaceId: activeWorkspaceId,
        type,
        title: 'New Entry',
        content: '',
      },
      {
        onSuccess: (entry) => {
          navigate(`/w/${activeWorkspaceId}/entries/${entry.id}`);
        },
      },
    );
  };

  return (
    <SidebarRoot collapsible='offcanvas' className='border-sidebar-border border-r'>
      <SidebarHeader />

      <div className='px-3 pb-2'>
        <div className='bg-secondary rounded-md p-1'>
          <button className='hover:bg-sidebar-accent text-foreground flex w-full cursor-pointer items-center gap-2 rounded-[4px] px-2.5 py-1.5 text-left text-sm transition-colors focus:outline-none [&_svg]:!size-3.5'>
            <Icon icon='mingcute:search-2-line' className='h-3.5 w-3.5' />
            <span className='flex-1'>Search</span>
            <span className='text-muted-foreground text-xs'>Ctrl K</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='hover:bg-sidebar-accent text-foreground flex w-full cursor-pointer items-center gap-2 rounded-[4px] px-2.5 py-1.5 text-left text-sm transition-colors focus:outline-none [&_svg]:!size-3.5'>
                <Icon icon='mingcute:add-line' className='h-3.5 w-3.5' />
                <span className='flex-1'>Create</span>
                <Icon icon='mingcute:down-line' className='text-muted-foreground h-3.5 w-3.5 shrink-0' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              sideOffset={4}
              className='!w-[calc(var(--radix-dropdown-menu-trigger-width)+20px)] !overflow-hidden !rounded-md border border-border !bg-background p-1.5 !shadow-[0_2px_8px_rgb(0_0_0/0.06)] !ring-0 dark:!shadow-[0_2px_8px_rgb(0_0_0/0.4)] dark:!ring-0'
            >
              {SCHEMAS.map((schema) => (
                <DropdownMenuItem
                  key={schema.id}
                  onSelect={() => handleCreateEntry(schema.id)}
                  className='flex cursor-pointer items-center gap-2.5 rounded-[4px] px-3 py-1.5 text-sm'
                >
                  <Icon icon={schema.icon} className='h-3.5 w-3.5' />
                  <span>{schema.name}</span>
                </DropdownMenuItem>
              ))}
              <div className='bg-border mx-1 my-2 h-px' />
              <DropdownMenuItem className='text-muted-foreground cursor-pointer gap-2.5 rounded-[4px] px-3 py-1.5 text-sm'>
                <Icon icon='mingcute:grid-2-line' className='h-3.5 w-3.5' />
                <span>New Collection</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-muted-foreground cursor-pointer gap-2.5 rounded-[4px] px-3 py-1.5 text-sm'>
                <Icon icon='mingcute:add-line' className='h-3.5 w-3.5' />
                <span>New Schema</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='text-muted-foreground px-2 mb-1 text-xs font-medium'>
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-4 py-2 [&_svg]:!size-3.5'>
                  <Icon icon='mingcute:pin-line' className={NAV_ICON_SIZE} />
                  <span>Pinned</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-4 py-2 [&_svg]:!size-3.5'>
                  <Icon icon='mingcute:time-line' className={NAV_ICON_SIZE} />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isEntriesView && !activeSchema}
                  className='text-muted-foreground font-medium group-data-[collapsible=icon]:justify-center rounded-[7px] px-4 py-2 [&_svg]:!size-3.5'
                >
                  <Icon icon='mingcute:grid-2-line' className={NAV_ICON_SIZE} />
                  <span>All</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='text-muted-foreground px-2 mb-1 text-xs font-medium'>
            Schemas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SCHEMAS.map((schema) => (
                <SidebarMenuItem key={schema.id}>
                  <SidebarMenuButton
                    isActive={isActiveRow(schema.name)}
                    onClick={() => goToSchema(schema.name)}
                    className='text-muted-foreground font-medium group-data-[collapsible=icon]:justify-center rounded-[7px] px-4 py-2 [&_svg]:!size-3.5'
                  >
                    <Icon icon={schema.icon} className={NAV_ICON_SIZE} />
                    <span>{schema.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='text-muted-foreground px-2 mb-1 text-xs font-medium'>
            Collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {COLLECTIONS.map((collection) => (
                <SidebarMenuItem key={collection.name}>
                  <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-4 py-2 [&_svg]:!size-3.5'>
                    <Icon icon={collection.icon} className={NAV_ICON_SIZE} />
                    <span>{collection.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-2.5 py-2 [&_svg]:!size-3.5'>
                  <Icon icon='mingcute:chat-2-line' className={NAV_ICON_SIZE} />
                  <span>Conversations</span>
                  <span className='bg-foreground/70 ml-auto h-1.5 w-1.5 shrink-0 rounded-full' />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-2.5 py-2 [&_svg]:!size-3.5'>
                  <Icon icon='mingcute:question-line' className={NAV_ICON_SIZE} />
                  <span>Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground font-medium rounded-[7px] px-2.5 py-2 [&_svg]:!size-3.5'>
                  <Icon icon='mingcute:delete-2-line' className={NAV_ICON_SIZE} />
                  <span>Trash</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </SidebarRoot>
  );
}
