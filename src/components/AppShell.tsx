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
  Bell,
  MessageSquare,
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
import { cn } from '@/lib/utils';

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

type AppShellProps = {
  children: ReactNode;
  navItems: NavItem[];
  userRole: 'admin' | 'student' | 'teacher' | 'super-admin';
  pageTitles: { [key: string]: string };
  defaultTitle: string;
};

function AppHeader({
  pageTitles,
  defaultTitle,
  userRole
}: {
  pageTitles: { [key: string]: string };
  defaultTitle: string;
  userRole: AppShellProps['userRole'];
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || '';
    if (!lastSegment || ['admin', 'student', 'teacher', 'super-admin'].includes(lastSegment)) {
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
      case 'super-admin': return 'مشرف متميز';
      default: return '';
    }
  };
  
  const isSuperAdmin = userRole === 'super-admin';

  if (isSuperAdmin && user) {
    return (
       <header className="sticky top-0 z-10 p-4 sm:p-6">
         <div className="flex h-16 items-center gap-4 rounded-2xl border border-border/50 bg-card/80 px-4 shadow-lg backdrop-blur-sm sm:h-20 sm:px-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <AvatarImage
                      src={`https://picsum.photos/seed/${user.username}/48/48`}
                      alt={user.username}
                      data-ai-hint="profile picture"
                    />
                    <AvatarFallback>
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-lg font-bold text-foreground sm:text-xl">أهلاً بعودتك، {user.username}!</h1>
                    <p className="hidden text-xs text-muted-foreground sm:block">إليك نظرة عامة على يومك.</p>
                </div>
            </div>
            <div className="mr-auto flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
                    <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
                    <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto justify-start p-0 text-left" aria-label="user menu">
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
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
                        <LogOut className="mr-auto h-4 w-4" />
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
         </div>
       </header>
    );
  }

  return (
    <header className={cn(
      "sticky top-0 z-10 flex h-14 items-center gap-4 px-4 sm:px-6",
      isSuperAdmin ? "bg-transparent" : "bg-background/80 border-b backdrop-blur-sm"
    )}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="hidden text-sm text-muted-foreground md:inline">
          / {isSuperAdmin ? 'لوحات التحكم' : 'لوحات التحكم'} /
        </span>
        <h1 className="text-md font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="mr-auto flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={isSuperAdmin ? "اكتب هنا..." : "اكتب هنا..."}
            className={cn(
                "h-9 w-48 rounded-full pl-8",
                isSuperAdmin ? "bg-card border-border/50" : "bg-input"
            )}
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
              <DropdownMenuLabel className="font-normal" dir={isSuperAdmin ? 'rtl' : 'rtl'}>
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
                <span>{isSuperAdmin ? 'تسجيل الخروج' : 'تسجيل الخروج'}</span>
                <LogOut className="mr-auto h-4 w-4" />
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
  const isSuperAdmin = userRole === 'super-admin';

  return (
    <SidebarProvider>
      <div className={cn("flex min-h-screen w-full flex-row-reverse")}>
        <div className="flex w-full flex-1 flex-col">
          <AppHeader pageTitles={pageTitles} defaultTitle={defaultTitle} userRole={userRole} />
          <SidebarInset>{children}</SidebarInset>
        </div>
        <Sidebar collapsible="icon" variant={isSuperAdmin ? "floating" : "sidebar"} side={isSuperAdmin ? "left" : "right"} className={isSuperAdmin ? "border-r-0" : "border-l"}>
          <SidebarHeader className="p-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
            <Logo isSuperAdmin={isSuperAdmin} />
          </SidebarHeader>
          <SidebarSeparator className="my-1 opacity-0 group-data-[collapsible=icon]:opacity-100" />
          <SidebarContent>
            <SidebarMenu className="px-4 group-data-[collapsible=icon]:items-center">
              <SidebarMenuItem className="my-4 group-data-[collapsible=icon]:hidden">
                <span className="mb-2 block text-xs font-semibold text-muted-foreground/80">
                  {isSuperAdmin ? 'الصفحات' : 'الصفحات'}
                </span>
              </SidebarMenuItem>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index} className="my-1">
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, side: isSuperAdmin ? 'right' : 'left', align: 'center' }}
                    className={cn(
                        "text-lg",
                        isSuperAdmin ? "flex justify-start group-data-[collapsible=icon]:justify-center" : "flex justify-end group-data-[collapsible=icon]:justify-center"
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn("gap-4", isSuperAdmin ? "flex-row justify-start" : "flex-row-reverse justify-end")}
                    >
                      <item.icon className="h-5 w-5" />
                       <span className="group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
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
                    tooltip={{children: isSuperAdmin ? "تسجيل الخروج" : "تسجيل الخروج", side: isSuperAdmin ? "right" : "left", align: "center"}}
                    className={cn(
                        "flex w-full text-lg",
                        isSuperAdmin ? "flex-row justify-start group-data-[collapsible=icon]:justify-center" : "flex-row-reverse justify-end group-data-[collapsible=icon]:justify-center"
                    )}>
                      <LogOut className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{isSuperAdmin ? "تسجيل الخروج" : "تسجيل الخروج"}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
           </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
