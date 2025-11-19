"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { NavBar } from "@/components/nav/NavBar";
import { getTeacherByEmail } from "@/services/teacher.service";
import { showToast } from "@/store/toastSlice";
import { useDispatch } from "react-redux";
import { getExcelByTeacherId } from "@/services/schedule.service";

export default function LayoutB({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { getToken } = useAuth();

    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const [teacherId, setTeacherId] = useState<string | null>(null);

    useEffect(() => {
        if (!isSignedIn && isLoaded) {
            router.replace("/login");
        }
    }, [isSignedIn, isLoaded, router]);

    useEffect(() => {
        if (isSignedIn && user?.emailAddresses?.[0]?.emailAddress) {
            getTeacherByEmail(user.emailAddresses[0].emailAddress).then(
                (teacher) => {
                    if (teacher?._id) {
                        localStorage.setItem("teacherId", teacher._id);
                        setTeacherId(teacher._id);
                    }
                }
            );
        }
    }, [isSignedIn, user]);

    if (!isSignedIn && isLoaded) return null;

    const handleDownloadExcel = async () => {
        try {
            const teacherId = localStorage.getItem("teacherId");
            if (!teacherId) {
                dispatch(
                    showToast({
                        message: "No hay un profesor guardado en la sesión.",
                        type: "error",
                    })
                );
                return;
            }

            const token = await getToken({ template: "Consultec" });
            await getExcelByTeacherId(teacherId, token);
            dispatch(
                showToast({
                    message: "Excel descargado correctamente.",
                    type: "success",
                })
            );
            console.log("Excel downloaded successfully");
        } catch (error) {
            console.error("Error downloading Excel:", error);
            dispatch(
                showToast({
                    message: "Error al descargar el Excel.",
                    type: "error",
                })
            );
        }
    };

    return (
        <div className="flex flex-row w-full">
            <NavBar
                href="/admin/browse"
                items={[
                    {
                        title: "Busqueda",
                        icon: "/custom.svg",
                        href: "/admin/browse",
                    },
                    {
                        title: "Descargar Horario",
                        icon: "/download.svg",
                        onClick: handleDownloadExcel,
                    },
                    {
                        title: "Perfil",
                        icon: "/profile.svg",
                        href: `/admin/profile/${teacherId}`,
                        children: [
                            {
                                title: "Información",
                                icon: "info.svg",
                                href: `/admin/profile/${teacherId}/information`,
                            },
                            {
                                title: "Horario",
                                icon: "schedule.svg",
                                href: `/admin/profile/${teacherId}/schedule`,
                            },
                            // {
                            //     title: "Cerrar sesión",
                            //     icon: "logout.svg",
                            //     onClick: () => {
                            //         localStorage.removeItem("teacherId");
                            //     },
                            // },
                        ],
                    },
                ]}
            />
            <div className="md:h-screen overflow-y-auto pt-20 lg:pt-6 flex-grow p-6">
                {children}
            </div>
        </div>
    );
}
