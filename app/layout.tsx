import type { Metadata } from "next";
import "./globals.css";
import '@smastrom/react-rating/style.css';
import { generalSans, leJourSerif } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "@/providers/tanstackquery-provider";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/shared/components/primitives/radix/tooltip";
import { ThemeProvider } from "@/shared/components/Theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "AVENTRAIL | Perfume Retail",
  description: "A luxury perfume ecommerce store",
};

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${generalSans.variable} ${sans.variable} ${mono.variable} ${leJourSerif.variable}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider style={{ "--sidebar-width": "16rem" } as React.CSSProperties}>
              <Toaster position="top-center" richColors />
              <Provider>
                <TooltipProvider>
                  <div className="flex flex-col justify-center items-center w-screen min-h-screen">
                    {children}
                  </div>
                </TooltipProvider>
              </Provider>
              <div id="clerk-captcha"></div>
            </SidebarProvider>
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
