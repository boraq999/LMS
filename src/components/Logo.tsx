import { School } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/admin"
      className={cn(
        'flex items-center gap-2 text-sidebar-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md',
        className
      )}
    >
      <div className="flex shrink-0 items-center justify-center rounded-md bg-primary p-2 text-primary-foreground">
        <School className="h-5 w-5" />
      </div>
      <span className="text-lg font-bold font-headline group-data-[collapsible=icon]:hidden">
        Edumate
      </span>
    </Link>
  );
}
