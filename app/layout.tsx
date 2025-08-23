
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeToggleClient from './ThemeToggleClient';


export const metadata: Metadata = {
  title: 'Products Dashboard',
  description: 'Xcode Online Marketplace – Products Module',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Products</h1>
            <ThemeToggleClient />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
