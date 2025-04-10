import { NavBar } from "@/components/nav/NavBar";
import NavItem from "@/components/nav/NavItem";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                    href="/admin/profile/self/information"
                />
            </NavBar>
            <div className="md:h-screen overflow-y-auto pt-20 lg:pt-6 flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
