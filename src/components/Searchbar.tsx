"use client";
import { useState } from "react";

export function Searchbar() {
    const [filters, setFilters] = useState<string[]>([
        "Presencial",
        "Lunes",
        "Probabilidad",
    ]);

    const addFilter = (filter: string) => {
        setFilters((prev) => [...prev, filter]);
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Searchbar */}
            <section className="align-middle flex items-center  relative gap-2 h-12">
                <button
                    className="absolute left-0 py-2 px-3 my-1 border-r-1 border-dim cursor-pointer"
                    onClick={() => (window.location.href = "/students/browse")}
                >
                    <img
                        src="/search.svg"
                        className="w-5 hover:scale-110 hover:opacity-80 transition-all duration-300"
                        alt=""
                    />
                </button>
                <input
                    type="text"
                    placeholder="Buscar profesores..."
                    className="w-[600px] p-3 pl-14  bg-input border-0 rounded-sm focus:outline-secondary"
                />
                <button className="bg-secondary rounded-sm flex items-center justify-center h-full aspect-square cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300">
                    <img src="/filters.svg" className="w-5" alt="" />
                </button>
            </section>
            <section className="flex flex-row flex-wrap justify-start gap-3 w-full">
                {/* Active Filters */}
                {filters.map((filter, index) => (
                    <span
                        key={index}
                        className="bg-secondary text-white rounded-md px-2 py-[6px] flex items-center gap-2 text-sm  hover:scale-110 hover:opacity-90 transition-all duration-300"
                    >
                        <span className="pointer-events-none">{filter}</span>
                        <button>
                            <img
                                src="/cancel.svg"
                                onClick={() =>
                                    setFilters((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                            ></img>
                        </button>
                    </span>
                ))}
            </section>
        </div>
    );
}
