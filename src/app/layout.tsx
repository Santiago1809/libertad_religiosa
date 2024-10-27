import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chat de la mesa interreligiosa de la comuna 7 de Medellín",
  description: "Aplicación donde se podrá interactuar con la IA la cual dará respuestas sobre las actividades que se adelantan en la comuna 7 en base a la libertad religiosa y su aporte a la comunidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-black`}
      >
        <main>
        {children}
        </main>
      </body>
    </html>
  );
}
