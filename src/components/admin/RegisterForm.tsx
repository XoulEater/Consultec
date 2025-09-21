"use client";

import { useForm } from "react-hook-form";
import { showToast } from "@/store/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { getTeacherByEmail, createTeacher } from "@/services/teacher.service";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { isLoaded, signUp, setActive } = useSignUp();

    const { register, handleSubmit, formState: { errors } } = useForm();

    
    
    
    const onSubmit = async (data: any) => {
        if (!isLoaded) return; 

        try {
            // Registrar usuario con Clerk
            const result = await signUp.create({
                emailAddress: data.email,
                password: data.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                dispatch(
                    showToast({
                        message: "Registro exitoso",
                        type: "success",
                    })
                );
                // Buscar el id del teacher y guardarlo en localStorage
               try {
                   const teacher = await getTeacherByEmail(data.email);
                   if (teacher?._id) {
                       localStorage.setItem("teacherId", teacher._id);
                   }
               } catch (err: any) {
                   if (err.response?.status === 404) {

                        const nuevoTeacher = await createTeacher({ correo: data.email }) as { _id: string };
                       if (nuevoTeacher?._id) {
                           localStorage.setItem("teacherId", nuevoTeacher._id);
                       }
                    } else {
                        console.error("Error inesperado al registrar teacher", err);
                    }
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
        } catch (err: any) {
            console.error("Error en registro", err.errors);
            dispatch(
                showToast({
                    message: err.errors?.[0]?.message || "Error en el registro",
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
      {/* Email */}
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
            errors.email ? "opacity-100" : " opacity-0 pointer-events-none"
          }`}
        >
          {(errors.email?.message as string) || "vacio"}
        </span>
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
            {...register("password", { required: "Contraseña requerida" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {/* Icon toggle */}
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
          Registrarse
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
