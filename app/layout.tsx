import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AppUserProvider } from './userAuth/AppUserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WriteFlow - Blog Writing Platform',
  description: 'A modern blog writing platform with rich text editing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppUserProvider>
            {children}
          </AppUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}