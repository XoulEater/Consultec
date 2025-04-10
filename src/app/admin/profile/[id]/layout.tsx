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
                    title="Información"
                    icon="info.svg"
                    href="information"
                />
                <NavItem title="Horario" icon="schedule.svg" href="schedule" />
            </NavBar>

            <div className="h-screen overflow-y-auto flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
