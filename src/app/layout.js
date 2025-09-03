import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cola Demo',
  description: 'Data visualization and transformation platform for Cola',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel='icon' href='/favicon.ico' type='image/x-icon'/>
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
