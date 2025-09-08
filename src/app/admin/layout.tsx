"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { NavBar } from "@/components/nav/NavBar";
import { getTeacherByEmail } from "@/services/teacher.service";

export default function LayoutB({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [teacherId, setTeacherId] = useState<string | null>(null);

  
  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  useEffect(() => {
    if (isSignedIn && user?.emailAddresses?.[0]?.emailAddress) {
      getTeacherByEmail(user.emailAddresses[0].emailAddress)
        .then((teacher) => {
          if (teacher?._id) {
            localStorage.setItem("teacherId", teacher._id);
            setTeacherId(teacher._id);
          }
        });
    }
  }, [isSignedIn, user]);

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