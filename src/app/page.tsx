'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from "@/components/ui/skeleton"
import { School } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.role === 'student') {
            router.replace('/student');
        } else if (user.role === 'teacher') {
            router.replace('/teacher');
        } else if (user.role === 'admin') {
            router.replace('/admin');
        } else if (user.role === 'super-admin') {
            router.replace('/super-admin');
        } else {
            router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [loading, user, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
       <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary p-4 text-primary-foreground animate-pulse">
            <School className="h-8 w-8" />
        </div>
        <div className="space-y-2 text-center">
            <h1 className="font-headline text-2xl font-bold">Edumate</h1>
            <p className="text-muted-foreground">جاري تحميل تجربتك...</p>
        </div>
      </div>
    </div>
  );
}
