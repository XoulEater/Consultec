"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface FormData {
    name: string;
    school: string;
    location: string;
    subject: string;
    role: string;
}

export function Information() {
    const router = useRouter();
    const [alignment, setAlignment] = useState("web");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        setAlignment(newAlignment);
    };

    const [formData, setFormData] = useState<FormData>({
        name: "",
        school: "",
        location: "",
        subject: "",
        role: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (role: string) => {
        setFormData((prev) => ({
            ...prev,
            role: role,
        }));
    };

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
                    <h2 className="text-2xl font-semibold">Perfil</h2>
                </div>

                <form className="mt-5 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Role */}
                    <div className="lg:col-span-2">
                        <label className="block text-dim -mb-[1px]  ">
                            Rol*
                        </label>
                        <ul className="grid w-1/2 gap-3 md:grid-cols-2">
                            <li>
                                <input
                                    type="radio"
                                    id="profesor"
                                    name="type"
                                    value="Profesor"
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor="profesor"
                                    className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover   "
                                >
                                    <span className=" font-semibold">
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
                                />
                                <label
                                    htmlFor="tutor"
                                    className="flex items-center justify-between w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer peer-checked:border-primary  peer-checked:text-primary hover:text-gray-600 hover:bg-bghover "
                                >
                                    <span className=" font-semibold">
                                        Tutor
                                    </span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <label className="block text-dim">Nombre*</label>
                        <input
                            type="text"
                            className="p-3  w-full text-dim border-1 rounded-lg  border-hr focus:outline-secondary"
                            name="name"
                            placeholder=""
                            autoComplete="off"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-dim">
                            Correo electrónico*
                        </label>
                        <input
                            type="email"
                            className="p-3  w-full text-dim border-1 rounded-lg  border-hr focus:outline-secondary"
                        />
                    </div>

                    {/* Office */}
                    <div>
                        <label className="block text-dim">Oficina*</label>
                        <input
                            type="text"
                            className="p-3  w-full text-dim border-1 rounded-lg  border-hr focus:outline-secondary"
                        />
                    </div>

                    {/* Office Phone */}
                    <div>
                        <label className="block text-dim">
                            Teléfono de la oficina*
                        </label>
                        <input
                            type="number"
                            className="p-3  w-full text-dim border-1 rounded-lg  border-hr focus:outline-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div>
                        <label className="block text-dim">Sede*</label>
                        <select className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary">
                            <option value="">Selecciona un campus</option>
                            <option value="Cartago">Cartago</option>
                            <option value="San José">San José</option>
                            <option value="Alajuela">Alajuela</option>
                            <option value="San Carlos">San Carlos</option>
                            <option value="Limón">Limón</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-dim">Escuela*</label>
                        <select
                            className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                            name="school"
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

                    <div>
                        <label className="block text-dim">Cátedra*</label>
                        <select
                            className="w-full p-3 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                            name="subject"
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
                    <button className="px-4 py-2 bg-dim text-white rounded-md flex items-center hover:bg-dim/80 gap-2 transition-all duration-300">
                        <img src="/icons/reset.svg" alt="icon" />
                        <span className="text-sm font-semibold">
                            Restablecer
                        </span>
                    </button>
                    <button
                        className="px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary/80 gap-2 transition-all duration-300"
                        onClick={() => {
                            /* Add save handler */
                        }}
                    >
                        <img src="/icons/save.svg" alt="icon" />
                        <span className="text-sm font-semibold">Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
