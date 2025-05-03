"use client";
import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { Suspense, useEffect, useState } from "react";
import { getTeachers } from "@/services/teacher.service";
import { TeachersTable } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams();
    const [teachers, setTeachers] = useState<TeachersTable[]>([]);
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
        fetchTeachers();
    }, [searchParams.toString()]); // Trigger effect on searchParams change

    return (
        <div className=" flex flex-col gap-6">
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar />
            </Suspense>
            <hr className="border-t border-hr" />
            {loading ? (
                <div className="flex items-center justify-center pt-10 w-full bg-bgmain">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
                </div>
            ) : (
                <Table teachers={teachers} />
            )}
        </div>
    );
}
