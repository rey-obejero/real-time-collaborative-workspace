import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useWorkspace } from '../hooks/use-workspace';

const HEADER_BTN =
  'relative w-7 h-7 flex items-center justify-center rounded-[7px] hover:bg-hover cursor-pointer';
const HEADER_ICON = 'w-3.5 h-3.5';

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
            <button onClick={toggleSidebar} className={HEADER_BTN}>
              <Icon icon='mingcute:menu-line' className={HEADER_ICON} />
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Toggle sidebar
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => navigate(-1)} className={HEADER_BTN}>
              <Icon icon='mingcute:left-line' className={HEADER_ICON} />
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Back
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className='text-muted-foreground pointer-events-none w-7 h-7 flex items-center justify-center rounded-[7px] cursor-default'
            >
              <Icon icon='mingcute:right-line' className={HEADER_ICON} />
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Forward
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className={HEADER_BTN}>
              <Icon icon='mingcute:time-line' className={HEADER_ICON} />
            </button>
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
            <button onClick={toggleDark} className={HEADER_BTN}>
              {isDark ? (
                <Icon icon='mingcute:sun-line' className={HEADER_ICON} />
              ) : (
                <Icon icon='mingcute:moon-line' className={HEADER_ICON} />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          </TooltipContent>
        </Tooltip>

        <button className='flex h-7 items-center gap-1.5 rounded-[7px] px-2 cursor-pointer text-[14px] font-medium text-foreground hover:bg-hover'>
          <Icon icon='mingcute:ai-fill' className='w-3.5 h-3.5' />
          <span>Ask AI</span>
        </button>

        <button className='border-border flex h-7 items-center gap-1.5 rounded-[7px] border bg-transparent px-2 cursor-pointer text-[14px] font-medium text-foreground hover:bg-hover'>
          <Icon icon='mingcute:link-2-line' className='w-3.5 h-3.5' />
          <span>Share</span>
        </button>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className='relative w-8 h-8 flex items-center justify-center rounded-[7px] hover:bg-hover cursor-pointer'>
              <Icon icon='mingcute:more-1-fill' className='w-5 h-5' />
            </button>
          </TooltipTrigger>
          <TooltipContent side='bottom' sideOffset={4}>
            Menu
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
