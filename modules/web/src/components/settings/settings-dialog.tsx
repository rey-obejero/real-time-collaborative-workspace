import { useState } from 'react';
import type { AxiosError } from 'axios';
import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useSettingsStore } from '@/stores/settings-store';
import type { SettingsSection } from '@/stores/settings-store';
import { AddMemberDialog } from '@/features/workspaces/components/add-member-dialog';
import { useAddMember } from '@/features/workspaces/hooks/use-add-member';
import { useWorkspace } from '@/features/workspaces/hooks/use-workspace';

type MemberRole = 'Viewer' | 'Collaborator' | 'Administrator' | 'Owner';

type Member = {
  name: string;
  email: string;
  role: MemberRole;
};

type NavItem = {
  id: SettingsSection;
  label: string;
  icon: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Account',
    items: [
      { id: 'personal', label: 'Personal', icon: 'mingcute:user-3-line' },
      { id: 'preferences', label: 'Preferences', icon: 'mingcute:settings-3-line' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { id: 'general', label: 'General', icon: 'mingcute:settings-3-line' },
      { id: 'members', label: 'Members', icon: 'mingcute:user-3-line' },
      { id: 'schemas', label: 'Schemas', icon: 'mingcute:plugin-2-line' },
      { id: 'properties', label: 'Properties', icon: 'mingcute:list-check-line' },
    ],
  },
];

const MEMBER_ROLES: MemberRole[] = ['Viewer', 'Collaborator', 'Administrator', 'Owner'];

const SCHEMAS = [
  { id: 'page', name: 'Page', icon: 'mingcute:document-line' },
  { id: 'task', name: 'Task', icon: 'mingcute:task-line' },
  { id: 'project', name: 'Project', icon: 'mingcute:folder-line' },
  { id: 'note', name: 'Note', icon: 'mingcute:notebook-line' },
  { id: 'bookmark', name: 'Bookmark', icon: 'mingcute:bookmark-line' },
] as const;

const PROPERTIES = [
  { name: 'Status', types: ['Page', 'Task', 'Project'] },
  { name: 'Priority', types: ['Task', 'Project'] },
  { name: 'Due date', types: ['Task', 'Project'] },
  { name: 'Assignee', types: ['Task', 'Project'] },
  { name: 'Owner', types: ['Page', 'Note'] },
  { name: 'URL', types: ['Bookmark'] },
  { name: 'Tags', types: ['All types'] },
];

const dicebear = (seed: string) =>
  `https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt:1&lettersVariant=single:0&backgroundColor=000000&textColor=ffffff&seed=${encodeURIComponent(seed)}`;

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h4 className='text-muted-foreground mb-1 text-[16px] font-medium'>{title}</h4>
      <p className='text-muted-foreground mb-4 text-[13px]'>{subtitle}</p>
    </>
  );
}

function PersonalSection() {
  return (
    <div>
      <SectionHeading
        title='Personal'
        subtitle='Your account profile across workspaces.'
      />
      <div className='flex flex-col gap-1.5'>
        <label className='text-muted-foreground text-[12px] font-medium'>Profile</label>
        <div className='flex items-center gap-3'>
          <img src={dicebear('John')} alt='John Doe' className='h-7 w-7 rounded-full' />
          <div>
            <div className='text-foreground text-[14px] font-medium'>John Doe</div>
            <div className='text-muted-foreground text-[12px]'>john.doe@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferencesSection() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  return (
    <div>
      <SectionHeading title='Preferences' subtitle='Interface and behavior settings.' />
      <div className='flex items-center justify-between gap-4 py-2.5'>
        <div>
          <div className='text-foreground text-[14px] font-medium'>Appearance</div>
          <div className='text-muted-foreground text-[12px]'>
            Switch between light and dark mode
          </div>
        </div>
        <Button variant='outline' className='!px-3 !py-1.5 !text-[12px]' onClick={toggleDark}>
          <Icon icon={isDark ? 'mingcute:moon-line' : 'mingcute:sun-line'} />
          {isDark ? 'Dark' : 'Light'}
        </Button>
      </div>
    </div>
  );
}

function GeneralSection() {
  const [workspaceName, setWorkspaceName] = useState('My Workspace');

  return (
    <div>
      <SectionHeading title='General' subtitle='Workspace identity and defaults.' />
      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor='workspace-name'
          className='text-muted-foreground text-[12px] font-medium'
        >
          Workspace Name
        </label>
        <Input
          id='workspace-name'
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className='w-60'
        />
      </div>
    </div>
  );
}

function RoleMenu({
  value,
  onChange,
}: {
  value: MemberRole;
  onChange: (role: MemberRole) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='border-border hover:bg-muted inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border bg-transparent px-2.5 py-1 text-[12px] font-medium capitalize'>
          {value}
          <Icon icon='mingcute:down-line' className='size-3' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={4}
        className='!min-w-24 !rounded-md border border-border !bg-background p-1.5 !shadow-[0_2px_8px_rgb(0_0_0/0.06)] !ring-0 dark:!shadow-[0_2px_8px_rgb(0_0_0/0.4)] dark:!ring-0'
      >
        {MEMBER_ROLES.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onChange(role)}
            className={`cursor-pointer rounded-[4px] px-3 py-1.5 text-[12px] capitalize ${role === value ? 'bg-accent' : ''}`}
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MembersSection({
  members,
  onRoleChange,
  onAddMembers,
}: {
  members: Member[];
  onRoleChange: (email: string, role: MemberRole) => void;
  onAddMembers: () => void;
}) {
  return (
    <div>
      <SectionHeading
        title='Members'
        subtitle='Invite and manage members who can access this workspace.'
      />

      <Button className='mb-5' onClick={onAddMembers}>
        Add members
      </Button>

      <div className='mb-5'>
        <div className='text-muted-foreground mb-2 text-[12px] font-medium'>
          Other options
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' size='sm'>
            <Icon icon='mingcute:link-line' />
            Copy link
          </Button>
          <Button variant='outline' size='sm'>
            <Icon icon='mingcute:qrcode-line' />
            QR code
          </Button>
          <Button variant='outline' size='sm'>
            <Icon icon='mingcute:settings-3-line' />
            Manage link
          </Button>
        </div>
      </div>

      <div className='text-muted-foreground mb-2 text-[12px] font-medium'>
        All {members.length}
      </div>

      {members.map((member) => (
        <div
          key={member.email}
          className='flex items-center justify-between gap-3 border-t border-border py-2 first:border-t-0'
        >
          <div className='flex min-w-0 items-center gap-2.5'>
            <img
              src={dicebear(member.name)}
              alt={member.name}
              className='h-7 w-7 shrink-0 rounded-full'
            />
            <div className='min-w-0'>
              <div className='text-foreground truncate text-[14px] font-medium'>
                {member.name}
              </div>
              <div className='text-muted-foreground truncate text-[12px]'>
                {member.email}
              </div>
            </div>
          </div>
          <RoleMenu
            value={member.role}
            onChange={(role) => onRoleChange(member.email, role)}
          />
        </div>
      ))}
    </div>
  );
}

function SchemasSection() {
  return (
    <div>
      <SectionHeading
        title='Schemas'
        subtitle='Entry types available in this workspace.'
      />
      {SCHEMAS.map((schema) => (
        <div key={schema.id} className='border-b border-border py-2.5 last:border-b-0'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex min-w-0 items-center gap-2.5'>
              <Icon icon={schema.icon} className='text-muted-foreground size-4 shrink-0' />
              <span className='text-foreground truncate text-[14px] font-medium'>
                {schema.name}
              </span>
            </div>
            <Button variant='outline' size='sm'>
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PropertiesSection() {
  return (
    <div>
      <SectionHeading
        title='Properties'
        subtitle='Properties available on entry types across this workspace.'
      />
      {PROPERTIES.map((property) => (
        <div
          key={property.name}
          className='border-b border-border py-2.5 last:border-b-0'
        >
          <div className='flex items-center justify-between gap-3'>
            <div className='flex min-w-0 flex-col gap-0.5'>
              <span className='text-foreground text-[14px] font-medium'>
                {property.name}
              </span>
              <span className='text-muted-foreground text-[12px]'>
                {property.types.join(', ')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SettingsDialog() {
  const { isOpen: isOpenSettings, activeSection, closeSettings, setSection } = useSettingsStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const { activeWorkspaceId } = useWorkspace();
  const addMemberMutation = useAddMember();

  const handleAddMember = (data: { email: string; role: string }) => {
    if (!activeWorkspaceId) return;

    addMemberMutation.mutate(
      { workspaceId: activeWorkspaceId, data },
      {
        onSuccess: () => {
          const name = data.email.split('@')[0] || 'Member';
          setMembers((prev) => [
            ...prev,
            { name, email: data.email, role: data.role as MemberRole },
          ]);
          setIsAddMemberDialogOpen(false);
        },
      },
    );
  };

  const handleRoleChange = (email: string, role: MemberRole) => {
    setMembers((prev) =>
      prev.map((member) => (member.email === email ? { ...member, role } : member)),
    );
  };

  return (
    <>
      <Dialog
        open={isOpenSettings}
        onOpenChange={(open) => {
          if (!open) closeSettings();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className='min-h-[60vh] max-h-[80vh] gap-0 overflow-hidden rounded-lg p-0 shadow-[0_8px_40px_rgb(0_0_0/0.12)] dark:shadow-[0_8px_40px_rgb(0_0_0/0.5)] !ring-0 sm:max-w-2xl'
        >
          <button
            onClick={() => closeSettings()}
            className='absolute top-3 right-3 z-20 flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            <Icon icon='mingcute:x-line' className='size-3.5' />
          </button>
          <DialogTitle className='sr-only'>Settings</DialogTitle>
          <DialogDescription className='sr-only'>
            Settings for your account and workspace.
          </DialogDescription>

          <div className='flex min-h-0 flex-1'>
            <nav className='bg-sidebar no-scrollbar w-50 shrink-0 overflow-y-auto border-r border-border'>
              <div className='px-3 py-4 space-y-1.5'>
                {NAV_GROUPS.map((group, groupIdx) => (
                  <div key={group.label} className='space-y-1.5'>
                    <div
                      className={`text-muted-foreground px-2 text-[12px] font-medium ${groupIdx > 0 ? 'mt-4' : ''}`}
                    >
                      {group.label}
                    </div>
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSection(item.id)}
                        aria-current={activeSection === item.id ? 'page' : undefined}
                        className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-1.5 text-[14px] font-medium transition-colors focus:outline-none ${activeSection === item.id ? 'bg-sidebar-accent text-foreground' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'}`}
                      >
                        <Icon icon={item.icon} className='size-3.5' />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </nav>

            <div className='no-scrollbar flex-1 overflow-y-auto p-7'>
              {activeSection === 'personal' && <PersonalSection />}
              {activeSection === 'preferences' && <PreferencesSection />}
              {activeSection === 'general' && <GeneralSection />}
              {activeSection === 'members' && (
                <MembersSection
                  members={members}
                  onRoleChange={handleRoleChange}
                  onAddMembers={() => setIsAddMemberDialogOpen(true)}
                />
              )}
              {activeSection === 'schemas' && <SchemasSection />}
              {activeSection === 'properties' && <PropertiesSection />}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddMemberDialog
        isOpen={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        onSubmit={handleAddMember}
        isPending={addMemberMutation.isPending}
        error={
          addMemberMutation.error
            ? (addMemberMutation.error as AxiosError<{ error: { description: string } }>)
                .response?.data?.error?.description ??
              addMemberMutation.error.message
            : null
        }
      />
    </>
  );
}
