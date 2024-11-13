import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Augusto Ribeiro',
  description: 'Portfólio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        {children}
        <SpeedInsights />
        <GoogleAnalytics gaId="G-XLLB2HF41J" />
      </body>
    </html>
  );
}
