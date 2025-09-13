import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Tajawal } from 'next/font/google';
import { cn } from '@/lib/utils';

const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '700'],
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'Edumate',
  description: 'واجهة عصرية لإدارة المدارس.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(
          `${tajawal.variable} font-sans antialiased`,
          "bg-background text-foreground"
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
