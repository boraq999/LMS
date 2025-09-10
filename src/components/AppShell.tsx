'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  ChevronDown,
  LogOut,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
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

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type AppShellProps = {
  children: ReactNode;
  navItems: NavItem[];
  userRole: 'admin' | 'student' | 'teacher';
  pageTitles: { [key: string]: string };
  defaultTitle: string;
};

function AppHeader({
  pageTitles,
  defaultTitle,
}: {
  pageTitles: { [key: string]: string };
  defaultTitle: string;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || '';
    if (!lastSegment || ['admin', 'student', 'teacher'].includes(lastSegment)) {
      return defaultTitle;
    }
    return pageTitles[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };
  
  const getRoleName = () => {
    if (!user) return '';
    switch (user.role) {
      case 'admin': return 'مسؤول';
      case 'student': return 'طالب';
      case 'teacher': return 'معلم';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="hidden text-sm text-muted-foreground md:inline">
          / لوحات التحكم /
        </span>
        <h1 className="text-md font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="mr-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="اكتب هنا..."
            className="h-9 w-48 rounded-full bg-input pl-8"
          />
        </div>

        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto justify-start p-1 text-left">
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
                    {getRoleName()}
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

export function AppShell({
  children,
  navItems,
  userRole,
  pageTitles,
  defaultTitle,
}: AppShellProps) {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-row-reverse">
        <div className="flex w-full flex-1 flex-col">
          <AppHeader pageTitles={pageTitles} defaultTitle={defaultTitle} />
          <SidebarInset>{children}</SidebarInset>
        </div>
        <Sidebar collapsible="icon" variant="sidebar" side="right" className="border-l">
          <SidebarHeader className="p-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
            <Logo />
          </SidebarHeader>
          <SidebarSeparator className="my-1 opacity-0 group-data-[collapsible=icon]:opacity-100" />
          <SidebarContent>
            <SidebarMenu className="px-4 group-data-[collapsible=icon]:items-center">
              <SidebarMenuItem className="my-4 group-data-[collapsible=icon]:hidden">
                <span className="mb-2 block text-xs font-semibold text-muted-foreground/80">
                  الصفحات
                </span>
              </SidebarMenuItem>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index} className="my-1">
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: 'left', align: 'center' }}
                    className="flex justify-end group-data-[collapsible=icon]:justify-center text-lg"
                  >
                    <Link
                      href={item.href}
                      className="flex-row-reverse justify-end gap-4"
                    >
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
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
                    className="flex w-full flex-row-reverse justify-end group-data-[collapsible=icon]:justify-center text-lg">
                      <span className="group-data-[collapsible=icon]:hidden">تسجيل الخروج</span>
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
