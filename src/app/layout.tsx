import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Random Username Generator',
  description: 'Generate random usernames across categories',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
