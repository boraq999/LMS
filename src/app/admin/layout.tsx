'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  UserCog,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';

function AdminHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const getPageTitle = () => {
    const segment = pathname.split('/').pop();
    if (!segment || segment === 'admin') return 'لوحة التحكم';

    const titles: { [key: string]: string } = {
      dashboard: 'لوحة التحكم',
      students: 'الطلاب',
      teachers: 'المعلمون',
      classes: 'الفصول',
      calendar: 'التقويم',
      settings: 'الإعدادات',
    };
    return titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <span className="hidden text-sm text-muted-foreground md:inline">/ لوحات التحكم /</span>
        <h1 className="text-md font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="اكتب هنا..." className="h-9 w-48 rounded-full bg-input pr-8" />
        </div>
        
        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto justify-start p-1 text-left"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://picsum.photos/seed/${user.username}/40/40`}
                      alt={user.username}
                      data-ai-hint="profile picture"
                    />
                    <AvatarFallback>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden truncate text-sm font-medium lg:inline">
                    {user.username}
                  </span>
                  <ChevronDown className="hidden h-4 w-4 shrink-0 text-muted-foreground lg:inline" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    مسؤول
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}


function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/admin/students', icon: Users, label: 'الطلاب' },
    { href: '/admin/teachers', icon: UserCog, label: 'المعلمون' },
    { href: '/admin/classes', icon: BookOpen, label: 'الفصول' },
    { href: '#', icon: Calendar, label: 'التقويم' },
    { href: '#', icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-1 flex-col">
          <AdminHeader />
          <SidebarInset>{children}</SidebarInset>
        </div>
        <Sidebar collapsible="icon" variant="sidebar" side="right" className="border-l-0">
        <SidebarRail/>
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-4">
              <SidebarMenuItem>
                 <span className="mb-2 block text-xs font-semibold text-muted-foreground/80 group-data-[collapsible=icon]:hidden">
                    الصفحات
                  </span>
              </SidebarMenuItem>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{children: item.label, side: "left", align: "center"}}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
