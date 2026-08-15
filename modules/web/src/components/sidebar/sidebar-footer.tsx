import { Icon } from '@iconify/react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SidebarFooter() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  if (isCollapsed) {
    return (
      <div className='flex items-center justify-center p-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className='flex h-7 w-7 shrink-0 cursor-default items-center justify-center rounded text-xs font-semibold'>
              <img
                src='https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt:1&lettersVariant=single:0&backgroundColor=000000&textColor=ffffff&seed=User'
                alt='User'
                className='h-7 w-7 rounded'
              />
            </button>
          </TooltipTrigger>
          <TooltipContent side='right' sideOffset={8}>
            User
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className='px-3 py-3'>
      <button className='hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors focus:outline-none'>
        <img
          src='https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt:1&lettersVariant=single:0&backgroundColor=000000&textColor=ffffff&seed=User'
          alt='User'
          className='h-5 w-5 shrink-0 rounded'
        />
        <span className='text-sidebar-foreground flex-1 truncate text-left text-sm font-medium'>
          User
        </span>
        <Icon icon='mingcute:settings-3-line' className='text-muted-foreground ml-auto size-3.5' />
      </button>
    </div>
  );
}
