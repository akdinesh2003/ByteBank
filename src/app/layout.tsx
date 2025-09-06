
'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';


// export const metadata: Metadata = {
//   title: 'ByteBank X',
//   description: 'Smarter money. Zero cloud. Total control.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ByteBank X</title>
        <meta name="description" content="Smarter money. Zero cloud. Total control." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <CurrencyProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex min-h-screen w-full flex-col">
                <DashboardHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </CurrencyProvider>
        <Toaster />
      </body>
    </html>
  );
}
