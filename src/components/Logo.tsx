import { School } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className, isSuperAdmin = false, isFinance = false }: { className?: string, isSuperAdmin?: boolean, isFinance?: boolean }) {
  const getHref = () => {
    if (isSuperAdmin) return "/super-admin";
    if (isFinance) return "/finance";
    return "/admin";
  };

  const getIconBg = () => {
    if (isSuperAdmin) return "bg-super-admin-primary text-super-admin-primary-foreground";
    if (isFinance) return "bg-finance-primary text-finance-primary-foreground";
    return "bg-primary text-primary-foreground";
  };

  return (
    <Link
      href={getHref()}
      className={cn(
        'flex items-center gap-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md',
        className
      )}
    >
      <div className={cn("flex shrink-0 items-center justify-center rounded-lg p-2", getIconBg())}>
        <School className="h-5 w-5" />
      </div>
      <span className="text-lg font-bold group-data-[collapsible=icon]:hidden">
        Edumate
      </span>
    </Link>
  );
}
