import { useEffect, useRef } from "react";
import { TeacherContactInfo } from "@/lib/types";

type Props = {
    onClose: () => void;
    contact?: TeacherContactInfo | null;
};

function TeacherContactModal({ onClose, contact }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    console.log("Contact info:", contact);

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

    if (!contact) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div
                ref={modalRef}
                className="bg-bgmain/90 backdrop-blur-md border-t-4 border-primary/90 pb-10 p-6 rounded-md ring-black/10 ring-2 flex flex-col gap-6 w-full max-w-lg"
            >
                <header className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-medium">{contact.name || "Nombre no disponible"}</h2>
                        </div>
                    </div>
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <img src="/icons/close.svg" alt="Cerrar" />
                    </button>
                </header>

                <hr className="border-hr" />

                <section className="pl-6 flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-row gap-4 items-center">
                        <img src="/icons/mail.svg" alt="Email" className="w-5 h-5" />
                        <a
                            href={`mailto:${contact.email}`}
                            className="hover:text-primary transition-colors"
                        >
                            {contact.email || "Email no disponible"}
                        </a>
                    </div>

                    {contact.phone && (
                        <>
                            <hr className="border-hr" />
                            <div className="flex flex-row gap-4 items-center">
                                <img src="/icons/phone.svg" alt="Teléfono" className="w-5 h-5" />
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {contact.phone}
                                </a>
                            </div>
                        </>
                    )}

                    {contact.office && (
                        <>
                            <hr className="border-hr" />
                            <div className="flex flex-row gap-4 items-center">
                                <img src="/icons/location.svg" alt="Oficina" className="w-5 h-5" />
                                <span>{contact.office}</span>
                            </div>
                        </>
                    )}

                </section>
            </div>
        </div>
    );
}

export default TeacherContactModal;