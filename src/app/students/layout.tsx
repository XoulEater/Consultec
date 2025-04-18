import { NavBar } from "@/components/nav/NavBar";
import NavItem from "@/components/nav/NavItem";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex lg:flex-row w-full flex-col ">
            <NavBar href="/students">
                <NavItem
                    title="Personalizada"
                    icon="/custom.svg"
                    href="/students"
                />
                <NavItem
                    title="Matemática"
                    icon="/math.svg"
                    href="/students/browse?school=Escuela+de+Matemática"
                />
            </NavBar>
            <div className="md:h-screen overflow-y-auto pt-20 lg:pt-6 flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
