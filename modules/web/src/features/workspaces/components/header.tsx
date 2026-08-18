import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useWorkspace } from '../hooks/use-workspace';

export function Header() {
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { activeWorkspaceId } = useWorkspace();
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  const getBreadcrumb = () => {
    if (pathname.includes('/entries')) {
      const schema = new URLSearchParams(search).get('schema');
      return schema || 'All';
    }
    if (pathname.includes('/conversations')) return 'Conversations';
    return 'Workspace';
  };

  return (
    <header className='border-border bg-background flex h-14 shrink-0 select-none grid-cols-[1fr_auto_1fr] items-center border-b px-6'>
      <div className='flex items-center gap-1.5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' onClick={toggleSidebar}>
              <Icon icon='mingcute:menu-line' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Toggle sidebar
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' onClick={() => navigate(-1)}>
              <Icon icon='mingcute:left-line' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Back
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='pointer-events-none text-muted-foreground'
            >
              <Icon icon='mingcute:right-line' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Forward
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Icon icon='mingcute:time-line' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Recents
          </TooltipContent>
        </Tooltip>
      </div>

      <div className='relative'>
        <button className='flex items-center gap-2 rounded-[7px] border border-transparent px-2 h-7 text-[14px] cursor-pointer hover:border-border'>
          <Icon icon='mingcute:grid-2-line' className='w-3.5 h-3.5 text-muted-foreground' />
          <span className='text-foreground font-medium'>{getBreadcrumb()}</span>
        </button>
      </div>

      <div className='flex items-center justify-end gap-1.5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' onClick={toggleDark}>
              {isDark ? (
                <Icon icon='mingcute:sun-line' />
              ) : (
                <Icon icon='mingcute:moon-line' />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          </TooltipContent>
        </Tooltip>

        <Button variant='ghost' size='sm' className='gap-1.5 text-[14px]'>
          <Icon icon='mingcute:ai-fill' />
          <span>Ask AI</span>
        </Button>

        <Button variant='outline' size='sm' className='gap-1.5 text-[14px]'>
          <Icon icon='mingcute:link-2-line' />
          <span>Share</span>
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon-sm'>
              <Icon icon='mingcute:more-1-fill' className='size-5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Menu
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
