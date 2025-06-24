import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { StyledProvider } from "@/components/providers/styled-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Sarah & Michael | Our Wedding",
  description: "Join us as we celebrate our love story. Saturday, October 26, 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${inter.className} antialiased`}>
        <StyledProvider>
          {children}
        </StyledProvider>
      </body>
    </html>
  );
}
