"use client";
import { NavBar } from "@/components/nav/NavBar";
import NavItem from "@/components/nav/NavItem";
import { useParams } from "next/navigation";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { id } = useParams();
    return (
        <div className="flex flex-row w-full">
            <NavBar href="/admin/browse">
                <NavItem
                    title="Busqueda"
                    icon="/custom.svg"
                    href="/admin/browse"
                />
                <NavItem
                    title="Perfil"
                    icon="/profile.svg"
                    href={`/admin/profile/${id}/information`}
                />
            </NavBar>
            <div className="md:h-screen overflow-y-auto pt-20 lg:pt-6 flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
