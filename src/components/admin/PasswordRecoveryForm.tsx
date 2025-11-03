"use client"

import React, { useEffect, useState } from "react";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/toastSlice";

export default function PasswordRecoveryForm() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { isSignedIn } = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/admin/browse");
        }
    }, [isSignedIn, router]);

    if (!isLoaded) return null;

    async function sendResetCode(e: React.FormEvent) {
        e.preventDefault();
        if (!signIn) return;
        setIsSubmitting(true);
        try {
            await signIn.create({
                strategy: "reset_password_email_code",
                identifier: email,
            });
            setSuccessfulCreation(true);
            dispatch(showToast({ message: "Código enviado al correo.", type: "success" }));
        } catch (err: any) {
            console.error("Error sending reset code", err);
            dispatch(showToast({ message: err?.errors?.[0]?.longMessage || "Error al enviar código.", type: "error" }));
        } finally {
            setIsSubmitting(false);
        }
    }

    async function resetPassword(e: React.FormEvent) {
        e.preventDefault();
        if (!signIn) return;
        setIsSubmitting(true);
        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password,
            });

            if (result.status === "needs_second_factor") {
                setSecondFactor(true);
                dispatch(showToast({ message: "Se requiere verificación adicional.", type: "info" }));
            } else if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                dispatch(showToast({ message: "Contraseña restablecida. Has iniciado sesión.", type: "success" }));
                router.push("/admin/browse");
            } else {
                console.log("reset result", result);
            }
        } catch (err: any) {
            console.error("Error resetting password", err);
            dispatch(showToast({ message: err?.errors?.[0]?.longMessage || "Error al restablecer contraseña.", type: "error" }));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="flex flex-col gap-4 items-center w-full" onSubmit={!successfulCreation ? sendResetCode : resetPassword}>
            {!successfulCreation && (
                <>
                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className={`p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary border-hr`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="group relative inline-flex min-h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar código"}
                    </button>
                </>
            )}

            {successfulCreation && (
                <>
                    <div className="flex flex-col gap-1">
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            className={`p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary border-hr`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Código enviado al correo"
                            className={`p-3 w-[300px] text-dim border-1 rounded-lg focus:outline-secondary border-hr`}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="group relative inline-flex min-h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
                    </button>
                </>
            )}

            {secondFactor && <p className="text-warning">Se requiere 2FA — esta interfaz no lo maneja.</p>}
        </form>
    );
}