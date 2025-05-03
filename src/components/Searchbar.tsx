"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Importa useRouter
import FiltersModal from "./FiltersModal";
import { FilterList, FilterType } from "@/lib/types";

export function Searchbar() {
    const [showDialog, setShowDialog] = useState(false);
    const [filters, setFilters] = useState<FilterList>();
    const [filterLabels, setFilterLabels] = useState<string[]>([]);
    const [query, setQuery] = useState<string>(""); // Estado para almacenar la consulta de búsqueda, inicializado como cadena vacía

    // Get school from url
    const params = useSearchParams();
    const school = params.get("school");

    useEffect(() => {
        const storedFilters = sessionStorage.getItem("filters"); // Intenta obtener los filtros del sessionStorage
        if (storedFilters) {
            const parsedFilters = JSON.parse(storedFilters); // Parsea los filtros almacenados
            const filterList = new FilterList();

            filterList.setFilters(parsedFilters);

            if (school) {
                filterList.addFilter({
                    label: school,
                    value: school,
                    name: "school",
                });
            }

            // si hay name en la url, lo agrega al input de busqueda
            if (params.get("name")) {
                setQuery(params.get("name") as string); // Actualiza el estado de la consulta de búsqueda
            }

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
        const queryParam = query ? `&name=${query}` : ""; // Agrega el parámetro de consulta si existe
        const urlWithQuery = `${url}${queryParam}`; // Combina la URL de los filtros con el parámetro de consulta

        // Si la url actual contiene "browse", redirige a la página de búsqueda con los filtros aplicados
        if (window.location.href.includes("browse")) {
            router.push(`?${urlWithQuery}`);
            return;
        }
        if (window.location.href.includes("students")) {
            router.push(`students/browse?${urlWithQuery}`);
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
            <section className="align-middle flex items-center relative gap-2 h-12  lg:max-w-[620px]">
                <button
                    className="absolute left-0 py-2 px-3 my-1 border-r-1 border-hr cursor-pointer"
                    onClick={onSearch} // Llama a la función de búsqueda
                >
                    <img
                        src="/icons/search.svg"
                        className="w-5 hover:scale-110 hover:opacity-80 transition-all duration-300"
                        alt=""
                    />
                </button>
                <input
                    type="text"
                    placeholder="Buscar profesores..."
                    className="w-[600px] p-3 pl-14 bg-input border-0 rounded-sm focus:outline-secondary"
                    onChange={(e) => setQuery(e.target.value)} // Actualiza la consulta de búsqueda
                    value={query} // Establece el valor del input
                />
                <button
                    className="bg-gradient rounded-sm flex items-center justify-center h-full aspect-square cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
                    onClick={() => {
                        setShowDialog(true);
                    }}
                >
                    <img src="/icons/filters.svg" className="w-5" alt="" />
                </button>
            </section>
            <section className="flex flex-row flex-wrap justify-start gap-3 max-w-[620px]">
                {/* Active Filters */}
                {filterLabels.map((filter, index) => (
                    <span
                        key={`filter-${index}-${filter}`}
                        className="bg-primary text-white group relative rounded-md px-2 py-[6px] flex items-center gap-2 text-sm hover:bg-gray-500 transition-all duration-300 overflow-hidden hover:justify-center"
                    >
                        <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                            {filter}
                        </div>
                        <div
                            className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 cursor-pointer"
                            onClick={() => onRemoveFilter(index)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                width="20"
                                height="20"
                                strokeWidth="2"
                            >
                                {" "}
                                <path d="M18 6l-12 12"></path>{" "}
                                <path d="M6 6l12 12"></path>{" "}
                            </svg>
                        </div>
                    </span>
                ))}
                <button
                    className="bg-transparent rounded-md border-2 border-gray-500 text-gray-400 border-dashed px-2 h-[34px] flex items-center   hover:opacity-50 transition-all duration-300 cursor-pointer"
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
