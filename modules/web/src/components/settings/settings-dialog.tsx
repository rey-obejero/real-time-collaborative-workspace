import { useState } from 'react';
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

type MemberRole = 'Owner' | 'Editor' | 'Member';

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

const MEMBER_ROLES: MemberRole[] = ['Owner', 'Editor', 'Member'];

const INITIAL_MEMBERS: Member[] = [
  { name: 'John Doe', email: 'john.doe@example.com', role: 'Owner' },
];

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

const SMALL_BTN = 'h-7 rounded-[7px] px-2.5 text-[12px]';

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
        <button
          onClick={toggleDark}
          className='border-border hover:bg-muted inline-flex cursor-pointer items-center gap-1.5 rounded-[7px] border bg-transparent px-3 py-1.5 text-[12px] font-medium'
        >
          <Icon icon={isDark ? 'mingcute:sun-line' : 'mingcute:moon-line'} className='size-3.5' />
          {isDark ? 'Light' : 'Dark'}
        </button>
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
            className={`cursor-pointer capitalize ${role === value ? 'bg-accent' : ''}`}
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
          <Button variant='outline' className={SMALL_BTN}>
            <Icon icon='mingcute:link-line' className='size-3.5' />
            Copy link
          </Button>
          <Button variant='outline' className={SMALL_BTN}>
            <Icon icon='mingcute:qrcode-line' className='size-3.5' />
            QR code
          </Button>
          <Button variant='outline' className={SMALL_BTN}>
            <Icon icon='mingcute:settings-3-line' className='size-3.5' />
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
              <Icon icon={schema.icon} className='text-muted-foreground size-3.5 shrink-0' />
              <span className='text-foreground truncate text-[14px] font-medium'>
                {schema.name}
              </span>
            </div>
            <Button variant='outline' className={SMALL_BTN}>
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
            <span className='text-foreground text-[14px] font-medium'>
              {property.name}
            </span>
            <span className='text-muted-foreground shrink-0 text-[12px]'>
              {property.types.join(', ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SettingsDialog() {
  const { open, activeSection, closeSettings, setSection } = useSettingsStore();
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const handleAddMember = (email: string) => {
    const name = email.split('@')[0] || 'Member';
    setMembers((prev) => [...prev, { name, email, role: 'Member' }]);
  };

  const handleRoleChange = (email: string, role: MemberRole) => {
    setMembers((prev) =>
      prev.map((member) => (member.email === email ? { ...member, role } : member)),
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) closeSettings();
        }}
      >
        <DialogContent className='min-h-[60vh] max-h-[80vh] gap-0 overflow-hidden p-0 sm:max-w-2xl'>
          <DialogTitle className='sr-only'>Settings</DialogTitle>
          <DialogDescription className='sr-only'>
            Settings for your account and workspace.
          </DialogDescription>

          <div className='flex min-h-0 flex-1'>
            <nav className='bg-sidebar w-50 shrink-0 overflow-y-auto border-r border-border py-4'>
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className='mb-3'>
                  <div className='text-muted-foreground px-2 mb-1 text-[12px] font-medium'>
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSection(item.id)}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-[14px] font-medium transition-colors focus:outline-none ${activeSection === item.id ? 'bg-accent' : 'hover:bg-sidebar-accent'}`}
                    >
                      <Icon icon={item.icon} className='size-3.5' />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </nav>

            <div className='flex-1 overflow-y-auto p-7'>
              {activeSection === 'personal' && <PersonalSection />}
              {activeSection === 'preferences' && <PreferencesSection />}
              {activeSection === 'general' && <GeneralSection />}
              {activeSection === 'members' && (
                <MembersSection
                  members={members}
                  onRoleChange={handleRoleChange}
                  onAddMembers={() => setAddMemberOpen(true)}
                />
              )}
              {activeSection === 'schemas' && <SchemasSection />}
              {activeSection === 'properties' && <PropertiesSection />}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddMemberDialog
        open={addMemberOpen}
        onOpenChange={setAddMemberOpen}
        onAddMember={handleAddMember}
      />
    </>
  );
}
