"use client";

import { Searchbar } from "@/components/Searchbar";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-5 pb-24">
            {/* Logo */}
            <section className="flex flex-col items-center  ">
                <img
                    src="/capiTEC_blue.png"
                    className="h-56"
                    alt="capiTEC logo"
                />
                <img
                    src="/Consultec.png"
                    className="w-[400px]"
                    alt="consultec logo"
                />
            </section>

            <Searchbar />
        </div>
    );
}
