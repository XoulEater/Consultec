"use client";
import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { Suspense, useEffect, useState } from "react";
import { getTeachers } from "@/services/teacher.service";
import { TeacherContactInfo, TeachersTable } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import TeacherContactModal from "@/components/TeacherContactModal";



export default function Home() {
    const [teachers, setTeachers] = useState<TeachersTable[] | undefined>();
    const [searchParams, setSearchParams] = useState<string | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedContact, setSelectedContact] = useState<TeacherContactInfo | null>(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                if (searchParams === undefined) {
                    return;
                }
                const data = await getTeachers(searchParams);

                setTeachers(data.teachers); // Set teachers data
                setTotalPages(data.pagination.total_pages); // Set total pages
                setCurrentPage(data.pagination.actual_page); // Set current page
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };

        fetchTeachers();
    }, [searchParams]);

    // Helper to update page in search params
    const handlePageChange = (page: number) => {
        console.log("Changing page to:", page);
        if (page < 1 || page > totalPages) return;
        const params = new URLSearchParams(searchParams || "");
        params.set("page", page.toString());
        setSearchParams(params.toString());
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
                <div className=" flex flex-col gap-6 ">
                    <section className="flex flex-col gap-6">
                        <Searchbar />
                        <hr className="border-t border-hr" />
                    </section>
                    <Table
                        teachers={teachers}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onContactSelect={setSelectedContact}
                    />
                </div>

                {/* Teacher Contact Modal */}
                {selectedContact && (
                    <TeacherContactModal
                        onClose={() => setSelectedContact(null)}
                        contact={selectedContact}
                    />
                )}
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
