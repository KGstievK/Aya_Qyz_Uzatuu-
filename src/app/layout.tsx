import type { Metadata } from "next";
import { Montserrat, Playfair_Display} from "next/font/google";
import "./globals.scss";
import LayoutSide from "@/components/Layout/LayoutSide";

const montserrat = Montserrat({ subsets: ["latin"] });
const playfair_display = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'ЧАКЫРУУ',
    description: 'КАДЫРЛУУ КОНОГУБУЗ СИЗДЕРДИ УУЛУБУЗ КУДАЙБЕРГЕН КЕЛИНИБИЗ БУРУЛДУН ҮЙЛӨНҮҮ ТОЮНУНУН ЧАКЫРАБЫЗ',  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfair_display.className}>
        <LayoutSide>
          {children}
        </LayoutSide>
      </body>
    </html>
  );
}
