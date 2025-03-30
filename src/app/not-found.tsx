import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full gap-5 pb-24">
            <img
                className="h-56"
                src="https://media.tenor.com/MYZgsN2TDJAAAAAM/this-is.gif"
                alt=""
            />
            <h1 className="text-8xl font-extrabold">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <Link href="/students">
                <button className="bg-secondary hover:bg-primary text-light font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out">
                    Go Back Home
                </button>
            </Link>
        </div>
    );
}
