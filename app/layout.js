import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tienda de perfumes',
  description: 'Todo tipo de perfume para hombres y mujeres',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
