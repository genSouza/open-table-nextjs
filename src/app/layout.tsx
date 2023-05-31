import Navbar from "./components/Navbar";
import "./globals.css";
//import { Inter } from "next/font/google";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OpenTable",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <main className="w-screen min-h-screen bg-gray-100">
          <main className="m-auto bg-white max-w-screen-2xl">
            <Navbar />
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
