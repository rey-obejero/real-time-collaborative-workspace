import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';
import { useSidebar } from '@/components/ui/sidebar';

export function SidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div className='px-3 pt-3 pb-4'>
      {!isCollapsed && <WorkspaceSwitcher />}
    </div>
  );
}
