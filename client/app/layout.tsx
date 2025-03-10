"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/AuthContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import AuthLayout from "@/hooks/layouts/AuthLayout";
import RootLayout from "@/hooks/layouts/RootLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <AuthWrapper>
              {children}
          </AuthWrapper>
        </AuthContextProvider>
        
      </body>
    </html>
  );
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;

  return user ? <RootLayout>{children}</RootLayout> : <AuthLayout>{children}</AuthLayout>;
};