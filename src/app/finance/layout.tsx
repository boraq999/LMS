'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  PieChart,
  BarChart3,
  Calculator,
  Users,
  UserCheck,
  FileText,
  Banknote,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppShell } from '@/components/AppShell';

const navItems = [
  { href: '/finance', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { href: '/finance/tuition', icon: DollarSign, label: 'الرسوم الدراسية' },
  { href: '/finance/salaries', icon: UserCheck, label: 'الرواتب والمكافآت' },
  { href: '/finance/expenses', icon: TrendingUp, label: 'المصروفات التشغيلية' },
  { href: '/finance/invoices', icon: CreditCard, label: 'الفواتير' },
  { href: '/finance/payments', icon: Receipt, label: 'المدفوعات' },
  { href: '/finance/reports', icon: FileText, label: 'التقارير المالية' },
  { href: '/finance/analytics', icon: BarChart3, label: 'التحليلات المالية' },
  { href: '/finance/accounting', icon: Calculator, label: 'المحاسبة' },
];

const pageTitles = {
  'finance': 'لوحة التحكم المالية',
  tuition: 'الرسوم الدراسية',
  salaries: 'الرواتب والمكافآت',
  expenses: 'المصروفات التشغيلية',
  invoices: 'الفواتير',
  payments: 'المدفوعات',
  reports: 'التقارير المالية',
  analytics: 'التحليلات المالية',
  accounting: 'المحاسبة',
};

function FinanceLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'finance')) {
      router.replace('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    document.body.classList.add('finance-body');
    return () => {
      document.body.classList.remove('finance-body');
    };
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-emerald-950">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-emerald-800" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-emerald-800" />
            <Skeleton className="h-4 w-[200px] bg-emerald-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AppShell
        navItems={navItems}
        userRole="finance"
        pageTitles={pageTitles}
        defaultTitle="لوحة التحكم المالية"
      >
        {children}
      </AppShell>
    </>
  );
}

export default FinanceLayout;
