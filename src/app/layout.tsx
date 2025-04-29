import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import WaveLinesCanvas from '@/app/components/WaveLinesCanvas';

export const metadata: Metadata = {
  title: 'Augusto Ribeiro',
  description: 'Portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="pt">
      <body className="antialiased">
        <WaveLinesCanvas>{children}</WaveLinesCanvas>
        <SpeedInsights />
        <GoogleAnalytics gaId={gaId ?? ''} />
        <Analytics />
      </body>
    </html>
  );
}
