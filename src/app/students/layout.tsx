import { NavBar } from "@/components/NavBar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex lg:flex-row w-full flex-col ">
            <NavBar />
            <div className="md:h-screen overflow-y-auto pt-20 lg:pt-6 flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
