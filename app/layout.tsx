import type { Metadata } from "next";
import { Roboto, Rubik_Scribble } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  subsets: ['latin'], weight: ["400", "500"], style: ['normal', 'italic'],
  variable: '--roboto-text'


})

const rubik = Rubik_Scribble({
  weight: '400', style: 'normal', subsets: ['latin'],
  variable: '--rubik-text'
});

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Market",
    default: "Carrot Market"
  },
  description: "Sell and Buy the All Things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${roboto.variable}  bg-neutral-900 max-w-screen-sm mx-auto text-white`}>
        {children}
      </body>
    </html>
  );
} 
