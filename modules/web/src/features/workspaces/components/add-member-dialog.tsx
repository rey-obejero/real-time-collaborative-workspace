import { useState } from 'react';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MEMBER_ROLES = ['Viewer', 'Collaborator', 'Administrator', 'Owner'] as const;

export interface AddMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { email: string; role: string }) => void;
  isPending: boolean;
  error: string | null;
}

export function AddMemberDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
  error,
}: AddMemberDialogProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>('Collaborator');

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setEmail('');
      setRole('Collaborator');
    }
    onOpenChange(nextOpen);
  };

  const handleAddMember = () => {
    const trimmed = email.trim();
    if (!trimmed || isPending) return;

    onSubmit({ email: trimmed, role });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='gap-5 !rounded-lg !shadow-[0_8px_40px_rgb(0_0_0/0.12)] dark:!shadow-[0_8px_40px_rgb(0_0_0/0.5)] !ring-0 sm:max-w-sm'
      >
        <button
          onClick={() => onOpenChange(false)}
          className='absolute top-3 right-3 z-20 flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
        >
          <Icon icon='mingcute:x-line' className='size-3.5' />
        </button>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-[20px]'>Add member</DialogTitle>
            <DialogDescription className='text-muted-foreground text-[13px]'>
              Role
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className='flex items-center gap-2'>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            className='flex-1'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddMember();
              }
            }}
            autoFocus
            disabled={isPending}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='border-border hover:bg-muted inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border bg-transparent px-2.5 py-1.5 text-[13px] font-medium'>
                {role}
                <Icon icon='mingcute:down-line' className='size-3' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              sideOffset={4}
              className='!min-w-28 !rounded-md border border-border !bg-background p-1.5 !shadow-[0_2px_8px_rgb(0_0_0/0.06)] !ring-0 dark:!shadow-[0_2px_8px_rgb(0_0_0/0.4)] dark:!ring-0'
            >
              {MEMBER_ROLES.map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => setRole(r)}
                  className={`cursor-pointer rounded-[4px] px-3 py-1.5 text-[13px] capitalize ${r === role ? 'bg-accent' : ''}`}
                >
                  {r}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {error && (
          <p className='text-destructive text-[13px]'>{error}</p>
        )}

        <DialogFooter>
          <Button
            variant='outline'
            className='!px-3 !py-1.5 !text-[12px]'
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className='!px-3 !py-1.5 !text-[12px]'
            onClick={handleAddMember}
            disabled={isPending}
          >
            {isPending ? 'Adding...' : 'Add member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
