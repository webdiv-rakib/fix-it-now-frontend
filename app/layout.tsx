import "./globals.css";
import { DM_Sans, Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/shared/NavBar";

const notoSansHeading = Noto_Sans({ subsets: ['latin'], variable: '--font-heading' });

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", dmSans.variable, notoSansHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NavBar/>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
