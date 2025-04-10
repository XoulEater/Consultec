"use client";

import { Searchbar } from "@/components/Searchbar";

export default function Home() {
    return (
        <div className="flex flex-col md:items-center md:justify-center h-full w-full gap-5 pb-24">
            {/* Logo */}
            <section className=" flex-col items-center md:flex hidden ">
                <img
                    src="/logos/capiTEC.svg"
                    className="h-56 "
                    alt="capiTEC logo"
                />
                <img
                    src="/logos/consultec.svg"
                    className="w-[400px] "
                    alt="consultec logo"
                />
            </section>
            <Searchbar />
        </div>
    );
}
