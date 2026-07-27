// Shared nav config for the admin sidebar — single source of truth so the
// sidebar links, active-state highlighting, and dashboard shortcut cards
// never drift out of sync with each other.
export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  iconName:
    | 'dashboard'
    | 'leads'
    | 'services'
    | 'pricing'
    | 'posts'
    | 'portfolio'
    | 'resources'
    | 'restaurant';
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', href: '/admin', iconName: 'dashboard' }],
  },
  {
    label: 'Core',
    items: [
      { id: 'leads', label: 'Leads', href: '/admin/leads', iconName: 'leads' },
      { id: 'services', label: 'Services', href: '/admin/services', iconName: 'services' },
      { id: 'pricing', label: 'Pricing', href: '/admin/pricing', iconName: 'pricing' },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'posts', label: 'Blog Posts', href: '/admin/posts', iconName: 'posts' },
      { id: 'portfolio', label: 'Portfolio', href: '/admin/portfolio', iconName: 'portfolio' },
      { id: 'resources', label: 'Resources', href: '/admin/resources', iconName: 'resources' },
    ],
  },
  {
    label: 'Client Work',
    items: [
      { id: 'restaurant', label: 'Restaurant Projects', href: '/admin/restaurant-samples', iconName: 'restaurant' },
    ],
  },
];
