'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarCheck,
  Banknote,
  BookCopy,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/AppShell';
import Image from 'next/image';

const navItems = [
  { href: '/super-admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Users, label: 'Students' },
  { href: '#', icon: UserCog, label: 'Teachers' },
  { href: '#', icon: CalendarCheck, label: 'Attendance' },
  { href: '#', icon: Banknote, label: 'Finance' },
  { href: '#', icon: BookCopy, label: 'Academic' },
  { href: '#', icon: MessageSquare, label: 'Comms' },
  { href: '#', icon: Settings, label: 'Settings' },
];

const pageTitles = {
  'super-admin': 'Dashboard',
  students: 'Students',
  teachers: 'Teachers',
  attendance: 'Attendance',
  finance: 'Finance',
  academic: 'Academic',
  comms: 'Comms',
  settings: 'Settings',
};

function SuperAdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'super-admin')) {
      router.replace('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    document.body.classList.add('super-admin-body');
    return () => {
      document.body.classList.remove('super-admin-body');
    };
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-zinc-800" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-zinc-800" />
            <Skeleton className="h-4 w-[200px] bg-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      navItems={navItems}
      userRole="super-admin"
      pageTitles={pageTitles}
      defaultTitle="Dashboard"
    >
      {children}
    </AppShell>
  );
}

export default SuperAdminLayout;
