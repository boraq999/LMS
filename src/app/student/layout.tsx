'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  User,
  GraduationCap,
  ClipboardList,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/AppShell';

const navItems = [
  { href: '/student', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { href: '/student/subjects', icon: BookOpen, label: 'المواد الدراسية' },
  { href: '/student/grades', icon: GraduationCap, label: 'الدرجات' },
  { href: '/student/schedule', icon: Calendar, label: 'الجدول الدراسي' },
  { href: '/student/homework', icon: ClipboardList, label: 'الواجبات' },
  { href: '/student/profile', icon: User, label: 'الملف الشخصي' },
];

const pageTitles = {
  dashboard: 'لوحة التحكم',
  courses: 'المواد الدراسية',
  subjects: 'المواد الدراسية',
  grades: 'الدرجات',
  schedule: 'الجدول الدراسي',
  homework: 'الواجبات',
  profile: 'الملف الشخصي',
};


function StudentLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'student')) {
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
      userRole="student"
      pageTitles={pageTitles}
      defaultTitle="لوحة التحكم"
    >
      {children}
    </AppShell>
  );
}

export default StudentLayout;
