"use client";
import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { Suspense, useEffect, useState } from "react";
import { getTeachers } from "@/services/teacher.service";
import { TeachersTable } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [teachers, setTeachers] = useState<TeachersTable[] | undefined>();
    const [searchParams, setSearchParams] = useState<string | undefined>();

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                if (searchParams === undefined) {
                    return;
                }
                const data = await getTeachers(searchParams);

                // TODO: Remove this filter when the backend is ready
                setTeachers(
                    data.filter((teacher) => teacher.lastUpdate !== null)
                );
                console.log(
                    "Fetched teachers:",
                    data.filter((teacher) => teacher.lastUpdate !== null)
                ); // Debugging line
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };

        fetchTeachers();
    }, [searchParams]);

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
                    <Searchbar />
                    <hr className="border-t border-hr" />

                    <Table teachers={teachers} />
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
