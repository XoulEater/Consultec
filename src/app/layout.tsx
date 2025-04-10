import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Consultec",
    icons: {
        icon: "/logos/capiTEC.svg",
        shortcut: "/logos/capiTEC.svg",
        apple: "/logos/capiTEC.svg",
    },
    description: "Consultec - Encuentra tu profesor ideal",
    keywords: [
        "consultec",
        "consultas",
        "profesores",
        "tutores",
        "tec",
        "itcr",
        "instituto tecnológico de costa rica",
    ],
};
//hola
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="">
            <body className="">{children}</body>
        </html>
    );
}
