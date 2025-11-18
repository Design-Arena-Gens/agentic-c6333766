import type { Metadata } from 'next';
import { Atkinson_Hyperlegible, Merriweather, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const base = Source_Sans_3({ subsets: ['latin'], variable: '--font-family-base' });
const serif = Merriweather({ subsets: ['latin'], variable: '--font-family-serif', weight: ['300', '400', '700'] });
const atkinson = Atkinson_Hyperlegible({ subsets: ['latin'], variable: '--font-family-dyslexic', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Readable Space',
  description: 'Adjustable reading environment focused on accessibility and comfort.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${base.variable} ${serif.variable} ${atkinson.variable}`}>
      <body>{children}</body>
    </html>
  );
}
