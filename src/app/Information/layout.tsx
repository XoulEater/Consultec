import { NavBar } from "@/components/NavBar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row w-full">
            <NavBar />
            <div className="h-screen overflow-y-auto flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
