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
  ClipboardCheck,
  User,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/AppShell';

const navItems = [
  { href: '/teacher', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { href: '/teacher/classes', icon: BookOpen, label: 'فصولي' },
  { href: '/teacher/students', icon: Users, label: 'طلابي' },
  { href: '/teacher/students2', icon: Users, label: 'طلابي 2' },
  { href: '/teacher/assignments', icon: ClipboardCheck, label: 'الواجبات' },
  { href: '/teacher/schedule', icon: Calendar, label: 'الجدول الدراسي' },
  { href: '/teacher/profile', icon: User, label: 'الملف الشخصي' },
];

const pageTitles = {
  dashboard: 'لوحة التحكم',
  classes: 'فصولي',
  students: 'طلابي',
  students2: 'طلابي 2',
  assignments: 'الواجبات',
  schedule: 'الجدول الدراسي',
  profile: 'الملف الشخصي',
};

function TeacherLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'teacher')) {
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
      userRole="teacher"
      pageTitles={pageTitles}
      defaultTitle="لوحة تحكم المعلم"
    >
      {children}
    </AppShell>
  );
}

export default TeacherLayout;
