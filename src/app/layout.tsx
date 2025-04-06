import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Football Card Tracker',
  description: 'Track your football card collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}