import { useState } from 'react';
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
      <DialogContent className='gap-5 sm:max-w-xs'>
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
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMember}>Add member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
