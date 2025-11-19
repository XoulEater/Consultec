import React, { useMemo, useState, useRef, useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import { Schedule } from "../lib/types";

interface Subject {
    code: string;
    name: string;
}

interface SubjectSelectProps {
    control: Control<Schedule, any>;
    name: keyof Schedule;
    subjects: Subject[];
    label?: string;
    showLabel?: boolean;
    rules?: any;
}

const SubjectSelect: React.FC<SubjectSelectProps> = ({
    control,
    name,
    subjects,
    label = "Materia:",
    showLabel = true,
    rules,
}) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const filtered = useMemo(() => {
        // Helper to remove accents/tildes
        const normalize = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const q = normalize(query.trim().toLowerCase());
        if (!q) return subjects;
        return subjects.filter(
            (s) =>
                s.code.toLowerCase().includes(q) ||
                normalize(s.name.toLowerCase()).includes(q)
        );
    }, [query, subjects]);

    // Close on outside click
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <Controller
            control={control}
            name={name as any}
            rules={rules}
            render={({ field, fieldState }) => {
                const selected = subjects.find((s) => s.code === field.value);
                const display = selected
                    ? `${selected.code} - ${selected.name}`
                    : "Selecciona una materia";

                return (
                    <div className="block" ref={containerRef}>
                        {showLabel && (
                            <label className="block">
                                <span className="text-dim">{label}</span>
                            </label>
                        )}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen((v) => !v);
                                    // focus input when opening
                                    setTimeout(
                                        () => inputRef.current?.focus(),
                                        0
                                    );
                                }}
                                className="w-full text-left p-2 text-gray-200 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-secondary"
                            >
                                <span
                                    className={`${!selected ? "text-dim" : ""}`}
                                >
                                    {display}
                                </span>
                            </button>

                            {open && (
                                <div className="absolute left-0 right-0 mt-1 z-50 bg-bgmain border border-hr rounded shadow-md">
                                    <div className="p-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Buscar materia..."
                                            value={query}
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            className="w-full p-2 text-white bg-bgmain border border-hr rounded-md focus:outline-secondary"
                                        />
                                    </div>
                                    <ul className="max-h-56 overflow-auto">
                                        {filtered.length === 0 && (
                                            <li className="p-2 text-gray-400">
                                                No se encontraron materias
                                            </li>
                                        )}
                                        {filtered.map((subject) => (
                                            <li
                                                key={subject.code}
                                                className="cursor-pointer hover:bg-bghover"
                                                onClick={() => {
                                                    field.onChange(
                                                        subject.code
                                                    );
                                                    setQuery(
                                                        `${subject.code} - ${subject.name}`
                                                    );
                                                    setOpen(false);
                                                }}
                                            >
                                                <div className="text-sm grid grid-cols-[55px_1fr] gap-2 text-white border-b-1 border-b-hr p-2 ">
                                                    <span>{subject.code}</span>
                                                    <span>{subject.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {fieldState?.error && (
                                <div className="mt-1 text-red-400 text-sm">
                                    {fieldState.error.message ||
                                        "Este campo es requerido"}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default SubjectSelect;
