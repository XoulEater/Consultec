"use client";
import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { TeachersTable } from "@/lib/types";
import { getExcelByTeacherId } from "@/services/schedule.service";
import { getTeachers } from "@/services/teacher.service";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
    const [teachers, setTeachers] = useState<TeachersTable[] | undefined>();
    const [searchParams, setSearchParams] = useState<string | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                if (searchParams === undefined) {
                    return;
                }
                const data = await getTeachers(searchParams);
                setTeachers(data.teachers);
                setTotalPages(data.pagination.total_pages);
                setCurrentPage(data.pagination.actual_page);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };

        fetchTeachers();
    }, [searchParams]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams || "");
        params.set("page", page.toString());
        setSearchParams(params.toString());
    };

    const handleDownloadExcel = async () => {
        getExcelByTeacherId("680f083ea4c49105539a8ffa")
            .then(() => {
                console.log("Excel downloaded successfully");
            })
            .catch((error) => {
                console.error("Error downloading Excel:", error);
            });
    };
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center pt-10 w-full bg-bgmain">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
                </div>
            }
        >
            <SearchParamsWrapper setSearchParams={setSearchParams}>
                <div className=" flex flex-col gap-6">
                    <header className="flex flex-col gap-4 lg:flex-row justify-between items-start ">
                        <Searchbar />
                        <div className="flex flex-row gap-4">
                            <button className="bg-gradient text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 hover:scale-105 transition-all duration-300">
                                <img src="/icons/addschedule.svg" alt="add" />
                                <span>Nuevo Horario</span>
                            </button>
                            <button
                                className="bg-gradient text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 hover:scale-105 transition-all duration-300"
                                onClick={handleDownloadExcel}
                            >
                                <img src="/icons/download.svg" alt="add" />
                                <span>Descargar Horario</span>
                            </button>
                        </div>
                    </header>
                    <hr className="border-t border-hr" />

                    <Table
                        teachers={teachers}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
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
