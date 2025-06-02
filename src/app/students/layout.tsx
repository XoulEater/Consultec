import { NavBar } from "@/components/nav/NavBar";
import NavItem from "@/components/nav/NavItem";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full lg:flex-row flex-col ">
            <div className="w-[300px]">
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
            </div>
            <div className="h-screen w-full overflow-x-auto py-6 pt-20 lg:pt-6 px-1 sm:px-6">
                {children}
            </div>
        </div>
    );
}
