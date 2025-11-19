import React, { useRef, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { School, Cathedra, FilterList } from "@/lib/types";

type Props = {
    onClose: () => void;
    onOk: (filters: FilterList) => void;
    filters?: FilterList;
};
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", " Sábado"];
const schools = [
    {
        id: 1,
        name: "Escuela de Matemática",
        cathedras: [
            { id: 1, name: "Probabilidad" },
            { id: 2, name: "Álgebra" },
            { id: 3, name: "Cálculo" },
            { id: 4, name: "Estadistica" },
        ],
    },
];
const campus = [
    { id: 1, name: "Cartago" },
    { id: 2, name: "Alajuela" },
    { id: 3, name: "San José" },
    { id: 4, name: "San Carlos" },
    { id: 5, name: "Limón" },
];

export default function FiltersModal({ onClose, onOk, filters }: Props) {
    const [selectedModality, setSelectedModality] = useState("Cualquiera");
    const [hourRange, setHourRange] = useState<[number, number]>([7, 21]); // Rango inicial de horas
    const [selectedType, setSelectedType] = useState("Cualquiera");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedSchool, setSelectedSchool] = useState<School | undefined>();
    const [selectedCathedra, setSelectedCathedra] = useState<
        Cathedra | undefined
    >();
    const [selectedCampus, setSelectedCampus] = useState<string>("");

    // Si se pasan filtros, inicializa el estado con esos filtros
    useEffect(() => {
        if (filters) {
            const modalityFilter = filters.filters.find(
                (filter) => filter.name === "modality"
            );
            const hourRangeFilter = filters.filters.find(
                (filter) => filter.name === "hourRange"
            );
            const typeFilter = filters.filters.find(
                (filter) => filter.name === "type"
            );
            const daysFilter = filters.filters.find(
                (filter) => filter.name === "days"
            );
            const campusFilter = filters.filters.find(
                (filter) => filter.name === "campus"
            );
            const schoolFilter = filters.filters.find(
                (filter) => filter.name === "school"
            );
            const cathedraFilter = filters.filters.find(
                (filter) => filter.name === "cathedra"
            );

            if (modalityFilter) {
                setSelectedModality(modalityFilter.value);
            }
            if (hourRangeFilter) {
                const [start, end] = hourRangeFilter.value.split("-");
                setHourRange([parseInt(start), parseInt(end)]);
            }
            if (typeFilter) {
                setSelectedType(typeFilter.value);
            }
            if (daysFilter) {
                setSelectedDays(daysFilter.value.split(","));
            }
            if (campusFilter) {
                setSelectedCampus(campusFilter.value);
            }
            if (schoolFilter) {
                const schoolName = schoolFilter.value;
                var school = schools.find((s) => s.name === schoolName);
                setSelectedSchool(school || undefined);
            }
            console.log(cathedraFilter);
            if (cathedraFilter && school) {
                const cathedraName = cathedraFilter.value;
                const cathedra = school.cathedras.find(
                    (c) => c.name === cathedraName
                );
                setSelectedCathedra(cathedra || undefined);
            }
        }
    }, []);

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleApplyFilters = () => {
        const filters = [];

        if (selectedModality !== "Cualquiera") {
            filters.push({
                name: "modality",
                value: selectedModality,
                label: selectedModality,
            });
        }

        if (hourRange[0] !== 7 || hourRange[1] !== 21) {
            filters.push({
                name: "hourRange",
                value: `${hourRange[0]}-${hourRange[1]}`,
                label: `De ${hourRange[0]}:00 a ${hourRange[1]}:00`,
            });
        }

        if (selectedType !== "Cualquiera") {
            filters.push({
                name: "type",
                value: selectedType,
                label: selectedType,
            });
        }

        if (selectedDays.length > 0) {
            filters.push({
                name: "days",
                value: selectedDays.join(","),
                label: selectedDays.join(", "),
            });
        }
        if (selectedCampus) {
            filters.push({
                name: "campus",
                value: selectedCampus,
                label: selectedCampus,
            });
        }

        if (selectedSchool) {
            filters.push({
                name: "school",
                value: selectedSchool.name,
                label: selectedSchool.name,
            });
        }

        if (selectedCathedra) {
            filters.push({
                name: "cathedra",
                value: selectedCathedra.name,
                label: selectedCathedra.name,
            });
        }
        const res = new FilterList();
        res.setFilters(filters);
        onOk(res);
    };

    return (
        <>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />
            <div
                ref={modalRef}
                className=" h-11/12 w-full  lg:h-5/6 lg:w-2/5 fixed  inset-1/2 z-50 flex items-center justify-center  -translate-1/2  "
            >
                <div
                    className="bg-bgmain/90 border-t-4 border-t-primary/90
                 backdrop-blur-md rounded-xl h-full w-full flex flex-col p-4 "
                >
                    <header>
                        <div className="flex justify-between items-center pb-5 px-2 border-b-2 border-hr">
                            <h1 className="text-xl font-semibold">Filtros</h1>
                            <button
                                className=" rounded-sm e cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
                                onClick={onClose}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="hover:text-warning transition-all duration-300"
                                    stroke="currentColor"
                                    width="20"
                                    height="20"
                                    strokeWidth="2"
                                >
                                    {" "}
                                    <path d="M18 6l-12 12"></path>{" "}
                                    <path d="M6 6l12 12"></path>{" "}
                                </svg>
                            </button>
                        </div>
                    </header>
                    <main className="overflow-y-auto">
                        {/* Modality */}
                        <section className="flex flex-col gap-3 py-6 border-b-2 px-4 border-hr">
                            <h2 className="text-lg font-semibold">Modalidad</h2>
                            <ul className="grid w-full gap-3 md:grid-cols-3">
                                <li>
                                    <input
                                        type="radio"
                                        id="virtual"
                                        name="modality"
                                        value="Virtual"
                                        className="hidden peer"
                                        checked={selectedModality === "Virtual"}
                                        onChange={(e) =>
                                            setSelectedModality(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="virtual"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover   "
                                    >
                                        <span className="text-lg font-semibold">
                                            Virtual
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="presencial"
                                        name="modality"
                                        value="Presencial"
                                        className="hidden peer"
                                        checked={
                                            selectedModality === "Presencial"
                                        }
                                        onChange={(e) =>
                                            setSelectedModality(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="presencial"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover "
                                    >
                                        <span className="text-lg font-semibold">
                                            Presencial
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="cualquiera"
                                        name="modality"
                                        value="Cualquiera"
                                        className="hidden peer"
                                        checked={
                                            selectedModality === "Cualquiera"
                                        }
                                        onChange={(e) =>
                                            setSelectedModality(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="cualquiera"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover"
                                    >
                                        <span className="text-lg font-semibold">
                                            Cualquiera
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </section>

                        {/* Hour Range */}
                        <section className="flex flex-col gap-3 py-6 border-b-2 px-4 border-hr">
                            <h2 className="text-lg font-semibold">
                                Rango de Horas
                            </h2>
                            <div className="flex flex-col items-center">
                                <Slider
                                    range
                                    min={7}
                                    max={21}
                                    step={1}
                                    value={hourRange}
                                    onChange={(value) =>
                                        setHourRange(value as [number, number])
                                    }
                                    allowCross={false}
                                    handleStyle={[
                                        {
                                            backgroundColor: "#ffffff",
                                            borderColor: "#2071EF",
                                        },
                                        {
                                            backgroundColor: "#ffffff",
                                            borderColor: "#2071EF",
                                        },
                                    ]}
                                    trackStyle={[
                                        {
                                            backgroundColor: "#2071EF",
                                        },
                                    ]}
                                />
                                <div className="flex justify-between w-full mt-2 text-sm text-gray-600">
                                    <span>{hourRange[0]}:00</span>
                                    <span>{hourRange[1]}:00</span>
                                </div>
                            </div>
                        </section>

                        {/* Impartido Por */}
                        <section className="flex flex-col gap-3 py-6 border-b-2 px-4 border-hr">
                            <h2 className="text-lg font-semibold">
                                Impartido Por
                            </h2>
                            <ul className="grid w-full gap-3 md:grid-cols-3">
                                <li>
                                    <input
                                        type="radio"
                                        id="profesor"
                                        name="type"
                                        value="Profesor"
                                        className="hidden peer"
                                        checked={selectedType === "Profesor"}
                                        onChange={(e) =>
                                            setSelectedType(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="profesor"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover   "
                                    >
                                        <span className="text-lg font-semibold">
                                            Profesor
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="tutor"
                                        name="type"
                                        value="Tutor"
                                        className="hidden peer"
                                        checked={selectedType === "Tutor"}
                                        onChange={(e) =>
                                            setSelectedType(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="tutor"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover "
                                    >
                                        <span className="text-lg font-semibold">
                                            Tutor
                                        </span>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="cualquiera_t"
                                        name="type"
                                        value="Cualquiera"
                                        className="hidden peer"
                                        checked={selectedType === "Cualquiera"}
                                        onChange={(e) =>
                                            setSelectedType(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="cualquiera_t"
                                        className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover   "
                                    >
                                        <span className="text-lg font-semibold">
                                            Cualquiera
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </section>
                        {/* Dia */}
                        <section className="flex flex-col gap-3 py-6 border-b-2 px-4 border-hr">
                            <h2 className="text-lg font-semibold">Días</h2>
                            <ul className="w-48 text-sm font-medium text-main bg-bgmain border border-hr rounded-lg  ">
                                {days.map((day) => (
                                    <li
                                        key={`day-${day}`}
                                        className="w-full border-b border-hr "
                                    >
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={`${day}-checkbox`}
                                                type="checkbox"
                                                value=""
                                                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                checked={selectedDays.includes(
                                                    day
                                                )}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedDays(
                                                            (prev) => [
                                                                ...prev,
                                                                day,
                                                            ]
                                                        );
                                                    } else {
                                                        setSelectedDays(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (d) =>
                                                                        d !==
                                                                        day
                                                                )
                                                        );
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor={`${day}-checkbox`}
                                                className="w-full py-3 ms-2 text-sm font-medium text-gray-500"
                                            >
                                                {day}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        {/* Campus select */}
                        <section className="flex flex-col gap-3 py-6 border-b-2 px-4 border-hr">
                            <h2 className="text-lg font-semibold">Campus</h2>
                            <select
                                className="w-full lg:w-1/2 p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                                value={selectedCampus}
                                onChange={(e) =>
                                    setSelectedCampus(e.target.value)
                                }
                            >
                                <option value="">Selecciona un campus</option>
                                {campus.map((campus) => (
                                    <option
                                        key={`campus-${campus.id}`}
                                        value={campus.name}
                                    >
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                        </section>

                        {/* Escuela y catedra selects */}
                        {/* 
                        <section className="flex flex-col gap-3 py-6  px-4 ">
                            <h2 className="text-lg font-semibold">Escuela</h2>
                            <select
                                className="w-1/2 p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                                value={selectedSchool?.id || ""}
                                onChange={(e) => {
                                    const schoolId = Number(e.target.value);
                                    const school = schools.find(
                                        (s) => s.id === schoolId
                                    );
                                    setSelectedSchool(school || undefined);
                                    setSelectedCathedra(undefined); // Reset cathedra when school changes
                                }}
                            >
                                <option value="">Selecciona una escuela</option>
                                {schools.map((school) => (
                                    <option
                                        key={`school-${school.id}`}
                                        value={school.id}
                                    >
                                        {school.name}
                                    </option>
                                ))}
                            </select>
                            {selectedSchool?.cathedras && (
                                <>
                                    <h2 className="text-lg font-semibold">
                                        Cátedra
                                    </h2>
                                    <select
                                        className="w-1/2 p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                                        value={selectedCathedra?.id || ""}
                                        onChange={(e) => {
                                            const cathedraId = Number(
                                                e.target.value
                                            );
                                            const cathedra =
                                                selectedSchool.cathedras.find(
                                                    (c) => c.id === cathedraId
                                                );
                                            setSelectedCathedra(
                                                cathedra || undefined
                                            );
                                        }}
                                    >
                                        <option value="">
                                            Selecciona una cátedra
                                        </option>
                                        {selectedSchool.cathedras.map(
                                            (cathedra) => (
                                                <option
                                                    key={`cathedra-${cathedra.id}`}
                                                    value={cathedra.id}
                                                >
                                                    {cathedra.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </>
                            )}
                        </section> */}
                    </main>
                    <footer>
                        <div className="flex justify-between items-center pt-5 pb-1 px-2 border-t-2 border-hr">
                            <button
                                className="bg-gradient rounded-md py-2 px-4 cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
                                onClick={handleApplyFilters}
                            >
                                Aplicar Filtros
                            </button>
                            <button
                                className="text-gray-500 hover:text-gray-600"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </div>
                    </footer>
                </div>
            </div>

            <div className="fixed inset-0 bg-black/30 z-40" />
        </>
    );
}

// w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500
