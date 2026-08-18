import { Icon } from '@iconify/react';
import { useSettingsStore } from '@/stores/settings-store';

export function SidebarFooter() {
  const openSettings = useSettingsStore((s) => s.openSettings);
  const handleOpenSettings = () => openSettings('personal');

  return (
    <div className='px-3 py-3'>
      <button
        onClick={handleOpenSettings}
        className='hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 transition-colors focus:outline-none'
      >
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
