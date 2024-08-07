import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layouts/Header';
import NavBar from '@/components/layouts/NavBar';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s - Care Audiology',
    default: 'Care Audiology',
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Header />
      <NavBar />
      {children}
    </div>
  );
}
