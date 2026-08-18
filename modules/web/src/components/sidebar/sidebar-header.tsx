import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';

export function SidebarHeader() {
  return (
    <div className='px-3 pt-3 pb-4'>
      <WorkspaceSwitcher />
    </div>
  );
}
