"use client";
import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { TeachersTable } from "@/lib/types";
import { getTeachers } from "@/services/teacher.service";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
    const [teachers, setTeachers] = useState<TeachersTable[]>([]);
    const [searchParams, setSearchParams] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching
        const fetchTeachers = async () => {
            try {
                const data = await getTeachers(searchParams);

                // TODO: Remove this filter when the backend is ready
                setTeachers(
                    data.filter((teacher) => teacher.lastUpdate !== null)
                );
                console.log(
                    "Fetched teachers:",
                    data.filter((teacher) => teacher.lastUpdate !== null)
                ); // Debugging line

                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };
        if (searchParams) fetchTeachers();
    }, [searchParams]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchParamsWrapper setSearchParams={setSearchParams}>
                <div className=" flex flex-col gap-6">
                    <header className="flex flex-col gap-4 lg:flex-row justify-between items-start ">
                        <Searchbar />
                        <div className="flex flex-row gap-4">
                            <button className="bg-gradient text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 hover:scale-105 transition-all duration-300">
                                <img src="/icons/addschedule.svg" alt="add" />
                                <span>Nuevo Horario</span>
                            </button>
                            <button className="bg-gradient text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 hover:scale-105 transition-all duration-300">
                                <img src="/icons/download.svg" alt="add" />
                                <span>Descargar Horario</span>
                            </button>
                        </div>
                    </header>
                    <hr className="border-t border-hr" />
                    {loading ? (
                        <div className="flex items-center justify-center pt-10 w-full bg-bgmain">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
                        </div>
                    ) : (
                        <Table teachers={teachers} />
                    )}
                </div>
            </SearchParamsWrapper>
        </Suspense>
    );
}

function SearchParamsWrapper({
    setSearchParams,
    children,
}: {
    setSearchParams: (value: string) => void;
    children: React.ReactNode;
}) {
    const searchParams = useSearchParams();

    useEffect(() => {
        setSearchParams(searchParams.toString());
    }, [searchParams]);

    return <>{children}</>;
}
