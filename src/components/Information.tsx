"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    getTeacherById,
    updateTeacher,
    deleteTeacher,
} from "@/services/teacher.service";
import { SignOutButton } from "@clerk/nextjs";
import { Teacher } from "@/lib/types";

import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/toastSlice";

interface FormData {
    name: string;
    correo: string;
    oficina: string;
    telefono: string;
    campus: string;
    school: string;
    cathedra: string;
    type: string;
    userID: string;
}

export function Information() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [teacherId, setTeacherId] = useState<string | null>(null);
    const [teacherData, setTeacherData] = useState<Teacher | null>(null);

    const [alignment, setAlignment] = useState("web");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        setAlignment(newAlignment);
    };

    const [formData, setFormData] = useState<FormData>({
        name: "",
        correo: "",
        oficina: "",
        telefono: "",
        campus: "",
        school: "",
        cathedra: "",
        type: "",
        userID: "",
    });

    // Obtener el teacherId desde localStorage
    useEffect(() => {
        const storedTeacherId = localStorage.getItem("teacherId");
        if (storedTeacherId) {
            setTeacherId(storedTeacherId);
        } else {
            setError("No se encontró el ID del profesor en la sesión");
            setLoading(false);
        }
    }, []);

    // Función para cargar los datos del profesor
    const loadTeacherData = async () => {
        if (!teacherId) {
            setError("No se proporcionó un ID de profesor");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const teacherResponse = await getTeacherById(teacherId);
            setTeacherData(teacherResponse);

            // Imprimir los datos del profesor en consola para debug
            console.log("Datos completos del profesor:", teacherResponse);

            // Mapear TODOS los datos del profesor al formulario
            setFormData({
                name: teacherResponse.name || "",
                correo: teacherResponse.correo || teacherResponse.email || "",
                oficina:
                    teacherResponse.oficina || teacherResponse.office || "",
                telefono:
                    teacherResponse.telefono ||
                    teacherResponse.officePhone ||
                    "",
                campus:
                    teacherResponse.campus || teacherResponse.location || "",
                school: teacherResponse.school || "",
                cathedra:
                    teacherResponse.cathedra || teacherResponse.subject || "",
                type: teacherResponse.type || teacherResponse.role || "",
                userID: teacherResponse.userID || teacherResponse._id || "",
            });

            setError(null);
        } catch (err) {
            console.error("Error loading teacher data:", err);
            setError("Error al cargar los datos del profesor");
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos cuando el teacherId esté disponible
    useEffect(() => {
        if (teacherId) {
            loadTeacherData();
        }
    }, [teacherId]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (type: string) => {
        setFormData((prev) => ({
            ...prev,
            type: type,
        }));
    };

    const handleSave = async () => {
        if (!teacherId) return;

        try {
            setSaving(true);
            await updateTeacher(teacherId, formData);
            dispatch(
                showToast({
                    message: "Información guardada exitosamente",
                    type: "success",
                })
            );
        } catch (error) {
            console.error("Error saving teacher data:", error);
            dispatch(
                showToast({
                    message: "Error al guardar la información",
                    type: "error",
                })
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAndLogout = async () => {
        const teacherId = localStorage.getItem("teacherId");
        if (teacherId) {
            await deleteTeacher(teacherId);
            localStorage.removeItem("teacherId");
        }
    };

    // Mostrar loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">
                    Cargando información del profesor...
                </div>
            </div>
        );
    }

    // Mostrar error
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="text-red-500 text-lg">{error}</div>
                <button
                    onClick={loadTeacherData}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Main Content */}
            <div className="w-3/4">
                <div className="flex flex-row gap-2 items-center">
                    <button
                        className=" cursor-pointer p-2"
                        onClick={() => {
                            router.push("/admin/browse");
                        }}
                    >
                        <img
                            src="/icons/back.svg"
                            alt="back"
                            className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out"
                        />
                    </button>
                    <h2 className="text-2xl font-semibold">Perfil Completo</h2>
                </div>

                <form className="mt-5 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Role/Type */}
                    <div className="lg:col-span-2">
                        <label className="block text-dim -mb-[1px]">
                            Tipo*
                        </label>
                        <ul className="grid w-1/2 gap-3 md:grid-cols-2">
                            <li>
                                <input
                                    type="radio"
                                    id="profesor"
                                    name="type"
                                    value="Profesor"
                                    className="hidden peer"
                                    checked={formData.type === "Profesor"}
                                    onChange={(e) =>
                                        handleRoleChange(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="profesor"
                                    className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-bghover"
                                >
                                    <span className="font-semibold">
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
                                    checked={formData.type === "Tutor"}
                                    onChange={(e) =>
                                        handleRoleChange(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="tutor"
                                    className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-bghover"
                                >
                                    <span className="font-semibold">Tutor</span>
                                </label>
                            </li>
                        </ul>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-dim">Nombre*</label>
                        <input
                            type="text"
                            className="p-3 w-full text-dim border-1 rounded-lg border-hr focus:outline-secondary"
                            name="name"
                            placeholder=""
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-dim">
                            Correo electrónico*
                        </label>
                        <input
                            type="email"
                            name="correo"
                            className="p-3 w-full text-dim border-1 rounded-lg border-hr focus:outline-secondary"
                            value={formData.correo}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Oficina */}
                    <div>
                        <label className="block text-dim">Oficina*</label>
                        <input
                            type="text"
                            name="oficina"
                            className="p-3 w-full text-dim border-1 rounded-lg border-hr focus:outline-secondary"
                            value={formData.oficina}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-dim">Teléfono*</label>
                        <input
                            type="text"
                            name="telefono"
                            className="p-3 w-full text-dim border-1 rounded-lg border-hr focus:outline-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={formData.telefono}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Campus */}
                    <div>
                        <label className="block text-dim">Campus*</label>
                        <select
                            className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                            name="campus"
                            value={formData.campus}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecciona un campus</option>
                            <option value="Cartago">Cartago</option>
                            <option value="San José">San José</option>
                            <option value="Alajuela">Alajuela</option>
                            <option value="San Carlos">San Carlos</option>
                            <option value="Limón">Limón</option>
                        </select>
                    </div>

                    {/* School */}
                    <div>
                        <label className="block text-dim">Escuela*</label>
                        <select
                            className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar escuela</option>
                            <option value="Escuela de Matemática">
                                Escuela de Matemática
                            </option>
                            <option value="Escuela de Física">
                                Escuela de Física
                            </option>
                            <option value="Escuela de Química">
                                Escuela de Química
                            </option>
                            <option value="Escuela de Computación">
                                Escuela de Computación
                            </option>
                        </select>
                    </div>

                    {/* Cátedra */}
                    <div>
                        <label className="block text-dim">Cátedra*</label>
                        <select
                            className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                            name="cathedra"
                            value={formData.cathedra}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar cátedra</option>
                            <option value="Matemática General">
                                Matemática General
                            </option>
                            <option value="Cálculo">Cálculo</option>
                            <option value="Álgebra Lineal">
                                Álgebra Lineal
                            </option>
                            <option value="Ecuaciones Diferenciales">
                                Ecuaciones Diferenciales
                            </option>
                        </select>
                    </div>
                </form>

                {/* Action Buttons */}
                <div className="mt-10 flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-dim text-white rounded-md flex items-center hover:bg-dim/80 gap-2 transition-all duration-300"
                        onClick={loadTeacherData}
                        disabled={loading}
                    >
                        <img src="/icons/reset.svg" alt="icon" />
                        <span className="text-sm font-semibold">
                            Restablecer
                        </span>
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary/80 gap-2 transition-all duration-300 disabled:opacity-50"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        <img src="/icons/save.svg" alt="icon" />
                        <span className="text-sm font-semibold">
                            {saving ? "Guardando..." : "Guardar"}
                        </span>
                    </button>
                    <SignOutButton>
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary/80 gap-2 transition-all duration-300 disabled:opacity-50"
                            onClick={async () => {
                                await handleDeleteAndLogout();
                            }}
                        >
                            Eliminar
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
