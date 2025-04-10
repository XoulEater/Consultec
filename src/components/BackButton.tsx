import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            className=" cursor-pointer p-2"
            onClick={() => {
                router.back();
            }}
        >
            <img
                src="/icons/back.svg"
                alt="back"
                className="w-6 h-6 hover:scale-110 transition-all duration-300 ease-in-out"
            />
        </button>
    );
}
