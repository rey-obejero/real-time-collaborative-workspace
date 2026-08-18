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

export interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (email: string) => void;
}

export function AddMemberDialog({
  open,
  onOpenChange,
  onAddMember,
}: AddMemberDialogProps) {
  const [email, setEmail] = useState('');

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setEmail('');
    }
    onOpenChange(nextOpen);
  };

  const handleAddMember = () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    onAddMember(trimmed);
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='gap-5 !rounded-lg !shadow-[0_8px_40px_rgb(0_0_0/0.12)] dark:!shadow-[0_8px_40px_rgb(0_0_0/0.5)] !ring-0 sm:max-w-xs'
      >
        <button
          onClick={() => onOpenChange(false)}
          className='absolute top-3 right-3 z-20 flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
        >
          <Icon icon='mingcute:x-line' className='size-3.5' />
        </button>
        <DialogHeader>
          <DialogTitle className='text-[20px]'>Add member</DialogTitle>
          <DialogDescription>
            Enter a username or email to send an invite.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Username or email'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddMember();
            }
          }}
          autoFocus
        />

        <DialogFooter>
          <Button
            variant='outline'
            className='!px-3 !py-1.5 !text-[12px]'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className='!px-3 !py-1.5 !text-[12px]'
            onClick={handleAddMember}
          >
            Add member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
