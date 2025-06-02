"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/store/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data: any) => {
        // TODO: Implement login logic
        if (
            data.email === "josepablo28072004@gmail.com" &&
            data.password === "1234"
        ) {
            dispatch(
                showToast({
                    message: "Inicio de sesión exitoso",
                    type: "success",
                })
            );
            router.push("/admin/browse");
            reset();
        } else {
            dispatch(
                showToast({
                    message: "Credenciales incorrectas",
                    type: "error",
                })
            );
        }
    };

    return (
        <form
            className="flex flex-col gap-4 items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-1">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className={`p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary ${
                        errors.email ? "border-warning" : "border-hr"
                    }`}
                    {...register("email", {
                        required: "Correo requerido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Correo inválido",
                        },
                    })}
                />
                <span
                    className={`text-warning text-sm pl-2 ${
                        errors.email
                            ? "opacity-100"
                            : " opacity-0 pointer-events-none"
                    }`}
                >
                    {(errors.email?.message as string) || "vacio"}
                </span>
            </div>

            <div className="flex flex-col gap-1 ">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className={`p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary ${
                            errors.password ? "border-warning" : "border-hr"
                        }`}
                        {...register("password", {
                            required: "Contraseña requerida",
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                        aria-label={
                            showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                        }
                    >
                        {!showPassword ? (
                            // Eye-off icon

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#898989"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                            </svg>
                        ) : (
                            // Eye icon

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#898989"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                                <path d="M3 15l2.5 -3.8" />
                                <path d="M21 14.976l-2.492 -3.776" />
                                <path d="M9 17l.5 -4" />
                                <path d="M15 17l-.5 -4" />
                            </svg>
                        )}
                    </button>
                </div>
                <span
                    className={`text-warning text-sm pl-2 ${
                        errors.password
                            ? "opacity-100"
                            : " opacity-0 pointer-events-none"
                    }`}
                >
                    {(errors.password?.message as string) || "vacio"}
                </span>
            </div>

            <button
                className="group relative inline-flex min-h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500"
                type="submit"
            >
                <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                    Iniciar sesión
                </div>
                <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                    >
                        <path
                            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </button>
        </form>
    );
}
function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
