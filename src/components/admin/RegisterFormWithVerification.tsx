"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/store/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { getTeacherByEmail } from "@/services/teacher.service";

export default function RegisterFormWithVerification() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<"email" | "verification">("email");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoadingVerification, setIsLoadingVerification] = useState(false);
    const { isLoaded, signUp, setActive } = useSignUp();

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    // Paso 1: Enviar código de verificación al email
    const handleSendVerificationCode = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            dispatch(
                showToast({
                    message: "Por favor ingresa un correo válido",
                    type: "error",
                })
            );
            return;
        }

        setIsLoadingVerification(true);
        try {
            // Verificar que existe un teacher con ese correo
            let teacher: any = null;
            try {
                teacher = await getTeacherByEmail(email);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    dispatch(
                        showToast({
                            message: "No existe un profesor con ese correo",
                            type: "error",
                        })
                    );
                    setIsLoadingVerification(false);
                    return;
                }
                throw err;
            }

            // Enviar código de verificación usando Clerk
            if (!isLoaded) {
                setIsLoadingVerification(false);
                return;
            }

            const signUpAttempt = await signUp?.create({
                emailAddress: email,
            });

            // Si el usuario ya existe, redirigir al login
            if (signUpAttempt?.status === "complete") {
                // Guardar el teacherId en localStorage
                if (teacher?._id) {
                    localStorage.setItem("teacherId", teacher._id);
                }

                dispatch(
                    showToast({
                        message: "El usuario ya existe. Redirigiendo al login...",
                        type: "info",
                    })
                );

                router.push("/login");
                return;
            }

            // Preparar verificación por email
            await signUp?.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            dispatch(
                showToast({
                    message: "Código enviado a tu correo",
                    type: "success",
                })
            );

            setStep("verification");
        } catch (err: any) {
            const errMsg = (err?.errors?.[0]?.message || err?.message || "").toString().toLowerCase();
            // Si el error indica que el usuario ya existe, redirigir al login
            if (errMsg.includes("already") || errMsg.includes("exists") || errMsg.includes("exist")) {
                try {
                    const teacher = await getTeacherByEmail(email);
                    if (teacher?._id) {
                        localStorage.setItem("teacherId", teacher._id);
                    }
                } catch (e) {
                    // Si no se puede obtener el teacher, continuar
                }

                dispatch(
                    showToast({
                        message: "El usuario ya existe. Redirigiendo al login...",
                        type: "info",
                    })
                );

                router.push("/login");
                return;
            }

            console.error("Error al enviar código de verificación", err);
            dispatch(
                showToast({
                    message:
                        err?.errors?.[0]?.message ||
                        "Error al enviar el código de verificación",
                    type: "error",
                })
            );
        } finally {
            setIsLoadingVerification(false);
        }
    };

    // Paso 2: Verificar código y crear contraseña
    const onSubmit = async (data: any) => {
        console.log("[RegisterFormWithVerification] submit clicked", {
            isLoaded,
            step,
            email,
            verificationCode,
            hasPassword: Boolean(data?.password),
        });

        if (!verificationCode.trim()) {
            console.warn("[RegisterFormWithVerification] empty code");
            dispatch(
                showToast({
                    message: "Ingresa el código de verificación",
                    type: "error",
                })
            );
            return;
        }

        if (!isLoaded || step !== "verification") {
            console.log("[RegisterFormWithVerification] blocked submit", {
                isLoaded,
                step,
            });
            return;
        }

        try {
            // Verificar el código
            const signUpAttempt = await signUp?.attemptEmailAddressVerification({
                code: verificationCode,
            });
            console.log("[RegisterFormWithVerification] attempt result", signUpAttempt);

            const needsPassword =
                (signUpAttempt?.status as string) === "needs_password" ||
                ((signUpAttempt?.status as string) === "missing_requirements" &&
                    Array.isArray(signUpAttempt?.missingFields) &&
                    signUpAttempt.missingFields.includes("password"));

            if (needsPassword) {
                // Actualizar la contraseña
                const result = await signUp?.update({
                    password: data.password,
                });
                console.log("[RegisterFormWithVerification] update result", result);

                if (result?.status === "complete") {
                    await setActive({ session: result.createdSessionId });

                    dispatch(
                        showToast({
                            message: "Registro exitoso",
                            type: "success",
                        })
                    );

                    try {
                        const teacher = await getTeacherByEmail(email);
                        if (teacher?._id) {
                            localStorage.setItem("teacherId", teacher._id);
                        }
                    } catch (e) {
                        console.error("Error obteniendo teacher ID", e);
                    }

                    router.push("/login");
                } else {
                    dispatch(
                        showToast({
                            message: "Se requiere verificación adicional",
                            type: "info",
                        })
                    );
                }
            } else if (signUpAttempt?.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });

                dispatch(
                    showToast({
                        message: "Registro exitoso",
                        type: "success",
                    })
                );

                try {
                    const teacher = await getTeacherByEmail(email);
                    if (teacher?._id) {
                        localStorage.setItem("teacherId", teacher._id);
                    }
                } catch (e) {
                    console.error("Error obteniendo teacher ID", e);
                }

                router.push("/login");
            } else {
                console.warn("[RegisterFormWithVerification] unexpected status", signUpAttempt?.status);
            }
        } catch (err: any) {
            const errMsg = (err?.errors?.[0]?.message || err?.message || "").toString().toLowerCase();
            console.error("[RegisterFormWithVerification] error flow", err);
            
            // Si el error indica código inválido o expirado
            if (errMsg.includes("invalid") || errMsg.includes("expired") || errMsg.includes("incorrect")) {
                dispatch(
                    showToast({
                        message: "Ingrese el código de verificación correcto",
                        type: "error",
                    })
                );
                return;
            }
            
            // Si el error indica que el usuario ya está verificado, redirigir al login
            if (errMsg.includes("already") || errMsg.includes("verified") || errMsg.includes("complete")) {
                try {
                    const teacher = await getTeacherByEmail(email);
                    if (teacher?._id) {
                        localStorage.setItem("teacherId", teacher._id);
                    }
                } catch (e) {
                    console.error("Error obteniendo teacher ID", e);
                }

                dispatch(
                    showToast({
                        message: "El usuario ya está verificado. Redirigiendo al login...",
                        type: "info",
                    })
                );

                router.push("/login");
                return;
            }

            console.error("Error en verificación o registro", err);
            dispatch(
                showToast({
                    message:
                        err?.errors?.[0]?.message ||
                        "Error en el registro. Verifica el código e intenta de nuevo",
                    type: "error",
                })
            );
        }
    };

    const handleBackToEmail = () => {
        setStep("email");
        setVerificationCode("");
        setIsLoadingVerification(false);
    };

    if (step === "email") {
        return (
            <form
                className="flex flex-col gap-4 items-center w-full"
                onSubmit={handleSendVerificationCode}
            >
                {/* Email */}
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary border-hr"
                    />
                </div>

                {/* Submit */}
                <button
                    className="group relative inline-flex min-h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoadingVerification}
                >
                    <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                        {isLoadingVerification ? "Enviando..." : "Enviar Código"}
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

    // Step 2: Verification and Password
    return (
        <form
            className="flex flex-col gap-4 items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Verification Code */}
            <div className="flex flex-col gap-1">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Código de verificación"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        className="p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary border-hr"
                    />
                </div>
            </div>

            {/* Password */}
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
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres",
                            },
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        tabIndex={-1}
                        aria-label={
                            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                    >
                        {!showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#898989"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#898989"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
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
                        errors.password ? "opacity-100" : " opacity-0 pointer-events-none"
                    }`}
                >
                    {(errors.password?.message as string) || "vacio"}
                </span>
            </div>

            {/* Submit */}
            <button
                className="group relative inline-flex min-h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500"
                type="submit"
            >
                <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                    Completar Registro
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

            {/* Back button */}
            <button
                type="button"
                onClick={handleBackToEmail}
                className="text-dim text-sm hover:text-main underline"
            >
                Usar otro correo
            </button>
        </form>
    );
}
