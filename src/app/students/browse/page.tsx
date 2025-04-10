import { Searchbar } from "@/components/Searchbar";
import { Table } from "@/components/Table";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className=" flex flex-col gap-6">
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar />
            </Suspense>
            <hr className="border-t border-hr" />
            <Table />
        </div>
    );
}
