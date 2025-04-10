import { Searchbar } from "@/components/Searchbar";

import { Table } from "@/components/Table";

export default function Home() {
    return (
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
            <Table />
        </div>
    );
}
