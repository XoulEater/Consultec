"use client";

import { useRouter, usePathname } from "next/navigation";

export default function NavItem({
    title,
    icon,
    href,
}: {
    title: string;
    icon: string;
    href: string;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        router.push(href);
    };

    const isActive = pathname.includes(href);

    return (
        <button
            className={`flex items-center gap-2 py-2 cursor-pointer px-4 w-full text-main  rounded-md transition-all duration-300 ease-in-out group hover:underline decoration-current ${
                isActive ? "bg-bghover " : ""
            }`}
            onClick={handleClick}
        >
            <div className="w-5 h-5 flex items-center justify-center rounded-sm group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                <img src={"/icons/" + icon} alt={title} />
            </div>
            <span className="font-medium text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                {title}
            </span>
        </button>
    );
}
