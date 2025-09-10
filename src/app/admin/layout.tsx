'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Settings,
  UserCog,
  BookCopy,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/AppShell';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { href: '/admin/students', icon: Users, label: 'الطلاب' },
  { href: '/admin/teachers', icon: UserCog, label: 'المعلمون' },
  { href: '/admin/classes', icon: BookOpen, label: 'الفصول' },
  { href: '/admin/subjects', icon: BookCopy, label: 'المواد' },
  { href: '#', icon: Calendar, label: 'التقويم' },
  { href: '#', icon: Settings, label: 'الإعدادات' },
];

const pageTitles = {
  dashboard: 'لوحة التحكم',
  students: 'الطلاب',
  teachers: 'المعلمون',
  classes: 'الفصول',
  subjects: 'المواد الدراسية',
  calendar: 'التقويم',
  settings: 'الإعدادات',
};

function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <AppShell
      navItems={navItems}
      userRole="admin"
      pageTitles={pageTitles}
      defaultTitle="لوحة التحكم"
    >
      {children}
    </AppShell>
  );
}

export default AdminLayout;
