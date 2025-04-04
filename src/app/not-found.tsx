import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-5 pb-24 absolute top-0 left-0 bg-light">
            <img
                className="h-56"
                src="https://media.tenor.com/MYZgsN2TDJAAAAAM/this-is.gif"
                alt=""
            />
            <h1 className="text-8xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">Página no encontrada</h2>
            <Link href="/students">
                <button className="bg-secondary  text-light font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">
                    Regresar al inicio
                </button>
            </Link>
        </div>
    );
}
