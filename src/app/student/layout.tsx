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
  BookOpen,
  Calendar,
  User,
  LogOut,
  ChevronDown,
  Search,
  GraduationCap,
  ClipboardList,
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

function StudentHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const getPageTitle = () => {
    const segment = pathname.split('/').pop();
    if (!segment || segment === 'student') return 'لوحة التحكم';

    const titles: { [key: string]: string } = {
      dashboard: 'لوحة التحكم',
      courses: 'المواد الدراسية',
      subjects: 'المواد الدراسية',
      grades: 'الدرجات',
      schedule: 'الجدول الدراسي',
      homework: 'الواجبات',
      profile: 'الملف الشخصي',
    };
    return titles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="hidden text-sm text-muted-foreground md:inline">/ لوحات التحكم /</span>
        <h1 className="text-md font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="mr-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="اكتب هنا..." className="h-9 w-48 rounded-full bg-input pl-8" />
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
                   <ChevronDown className="hidden h-4 w-4 shrink-0 text-muted-foreground lg:inline" />
                   <span className="hidden truncate text-sm font-medium lg:inline">
                    {user.username}
                  </span>
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
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal text-right">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    طالب
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={logout}>
                <span>تسجيل الخروج</span>
                <LogOut className="ml-2 h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}


function StudentLayout({ children }: { children: ReactNode }) {
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
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/student', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/student/subjects', icon: BookOpen, label: 'المواد الدراسية' },
    { href: '/student/grades', icon: GraduationCap, label: 'الدرجات' },
    { href: '/student/schedule', icon: Calendar, label: 'الجدول الدراسي' },
    { href: '/student/homework', icon: ClipboardList, label: 'الواجبات' },
    { href: '/student/profile', icon: User, label: 'الملف الشخصي' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-row-reverse">
        <div className="flex w-full flex-1 flex-col">
          <StudentHeader />
          <SidebarInset>{children}</SidebarInset>
        </div>
         <Sidebar collapsible="icon" variant="sidebar" side="right" className="border-l">
          <SidebarRail/>
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-4">
              <SidebarMenuItem className='my-4'>
                 <span className="mb-2 block text-xs font-semibold text-muted-foreground/80 group-data-[collapsible=icon]:hidden">
                    الصفحات
                  </span>
              </SidebarMenuItem>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index} className='my-1'>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={pathname === item.href}
                    tooltip={{children: item.label, side: "left", align: "center"}}
                    className="flex justify-end text-lg"
                  >
                    <Link href={item.href} className="flex-row-reverse justify-end gap-4">
                      <span>{item.label}</span>
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
           <SidebarFooter className="p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={logout}
                    size="lg"
                    tooltip={{children: "تسجيل الخروج", side: "left", align: "center"}}
                    className="flex w-full flex-row-reverse justify-end text-lg">
                      <span>تسجيل الخروج</span>
                      <LogOut className="h-5 w-5" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
           </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}

export default StudentLayout;
