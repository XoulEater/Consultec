"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import FiltersModal from "./FiltersModal";
import { FilterList, FilterType } from "@/lib/types";

export function Searchbar() {
    const [showDialog, setShowDialog] = useState(false);
    const [filters, setFilters] = useState<FilterList>();
    const [filterLabels, setFilterLabels] = useState<string[]>([]);

    useEffect(() => {
        const storedFilters = sessionStorage.getItem("filters"); // Intenta obtener los filtros del sessionStorage
        if (storedFilters) {
            const parsedFilters = JSON.parse(storedFilters); // Parsea los filtros almacenados
            const filterList = new FilterList();
            filterList.setFilters(parsedFilters);

            setFilters(filterList); // Actualiza el estado de los filtros

            setFilterLabels(
                filterList
                    .getFilters()
                    .map((filter: FilterType) => filter.label)
            ); // Actualiza el estado de los filtros
        }
    }, []); // Solo se ejecuta una vez al cargar el componente

    const router = useRouter(); // Initialize router

    const onOkDialog = (filters: FilterList) => {
        setFilters(filters); // Procesa los filtros recibidos
        setFilterLabels(filters.getFilters().map((filter) => filter.label)); // Actualiza el estado de los filtros
        sessionStorage.setItem("filters", JSON.stringify(filters.getFilters())); // Guarda los filtros en sessionStorage
        setShowDialog(false);
    };

    const onRemoveFilter = (index: number) => {
        if (filters) {
            // Elimina el filtro seleccionado
            setFilterLabels(
                filters.removeFilter(index).map((filter) => filter.label)
            ); // Actualiza el estado de los filtros
            setFilters(filters); // Actualiza el estado de los filtros
            sessionStorage.setItem(
                "filters",
                JSON.stringify(filters.getFilters())
            ); // Guarda los filtros en sessionStorage
        }
    };

    const onSearch = () => {
        const url = filters ? filters.getURL() : ""; // Obtiene la URL de los filtros

        // Si la url actual contiene "browse", redirige a la página de búsqueda con los filtros aplicados
        if (window.location.href.includes("browse")) {
            router.push(`?${url}`);
            return;
        }
        if (window.location.href.includes("students")) {
            router.push(`students/browse?${url}`);
            return;
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {showDialog && (
                <FiltersModal
                    onClose={() => setShowDialog(false)}
                    onOk={onOkDialog} // Pasa la función correctamente
                    filters={filters} // Pasa los filtros activos
                />
            )}
            {/* Searchbar */}
            <section className="align-middle flex items-center relative gap-2 h-12 w-[620px]">
                <button
                    className="absolute left-0 py-2 px-3 my-1 border-r-1 border-dim cursor-pointer"
                    onClick={onSearch} // Llama a la función de búsqueda
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
                    className="w-[600px] p-3 pl-14 bg-input border-0 rounded-sm focus:outline-secondary"
                />
                <button
                    className="bg-secondary rounded-sm flex items-center justify-center h-full aspect-square cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
                    onClick={() => {
                        setShowDialog(true);
                    }}
                >
                    <img src="/filters.svg" className="w-5" alt="" />
                </button>
            </section>
            <section className="flex flex-row flex-wrap justify-start gap-3 w-[620px]">
                {/* Active Filters */}
                {filterLabels.map((filter, index) => (
                    <span
                        key={index}
                        className="bg-secondary text-white rounded-md px-2 py-[6px] flex items-center gap-2 text-sm hover:scale-110 hover:opacity-90 transition-all duration-300"
                    >
                        <span className="pointer-events-none">{filter}</span>
                        <button>
                            <img
                                className="cursor-pointer"
                                src="/cancel.svg"
                                onClick={() => onRemoveFilter(index)}
                            ></img>
                        </button>
                    </span>
                ))}
                <button
                    className="bg-transparent rounded-md border-2 border-gray-400 text-gray-400 border-dashed px-2 h-[34px] flex items-center   hover:opacity-50 transition-all duration-300 cursor-pointer"
                    onClick={() => setShowDialog(true)} // Abre el modal de filtros
                >
                    <span className="pointer-events-none">
                        + Añadir filtros
                    </span>
                </button>
            </section>
        </div>
    );
}
