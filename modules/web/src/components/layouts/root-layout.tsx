import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '../sidebar';
import { Header } from '@/features/workspaces/components/header';
import { SettingsDialog } from '@/components/settings/settings-dialog';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className='bg-background flex h-screen w-screen overflow-hidden'>
      <TooltipProvider>
        <SidebarProvider>
          <Sidebar />
          <main className='flex flex-1 flex-col overflow-hidden'>
            <Header />
            <div className='flex-1 overflow-hidden'>{children}</div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
      <SettingsDialog />
    </div>
  );
};
