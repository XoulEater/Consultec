"use client";
import { useParams } from "next/navigation";

const days = ["L", "K", "M", "J", "V", "S", "D"];

export default function Home() {
    const { id } = useParams();

    const horario = [
        {
            day: 1,
            starth: 7,
            startm: 5,
            duration: 3,
        },
        {
            day: 2,
            starth: 8,
            startm: 0,
            duration: 3,
        },
        {
            day: 3,
            starth: 9,
            startm: 0,
            duration: 1,
        },
        {
            day: 4,
            starth: 10,
            startm: 0,
            duration: 2,
        },
        {
            day: 5,
            starth: 11,
            startm: 0,
            duration: 1,
        },
        {
            day: 6,
            starth: 12,
            startm: 0,
            duration: 4,
        },
    ];

    return (
        <div className=" flex flex-col gap-2 ">
            <header className="flex gap-4 ">
                <button className="">atras</button>
                <h1 className="">Profesor{id}</h1>
            </header>
            <hr className="" />
            <main>
                {/* Calendario semanal */}
                <div>
                    <div className="grid grid-cols-7 md:ml-14 ml-[18px]   justify-items-center">
                        <span>
                            L<span className="hidden md:inline">unes</span>
                        </span>
                        <span>
                            M<span className="hidden md:inline">artes</span>
                        </span>
                        <span>
                            M<span className="hidden md:inline">iércoles</span>
                        </span>

                        <span>
                            J<span className="hidden md:inline">ueves</span>
                        </span>
                        <span>
                            V<span className="hidden md:inline">iernes</span>
                        </span>
                        <span>
                            S<span className="hidden md:inline">ábado</span>
                        </span>

                        <span>
                            D<span className="hidden md:inline">omingo</span>
                        </span>
                    </div>
                </div>

                <div className="relative h-[84vh] overflow-y-auto">
                    <div className="absolute grid grid-cols-[18px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]  md:grid-cols-[56px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-[repeat(15,12px)] gap-0 z-10  w-full  ">
                        {horario.map((horario, index) => (
                            <div
                                key={index}
                                className="bg-primary/90 m-[1px] text-white p-2 text-xs "
                                style={{
                                    gridColumnStart: `${horario.day + 1}`,
                                    gridRowStart: `${
                                        (horario.starth - 7) * 6 +
                                        (horario.startm + 1)
                                    }`,
                                    height: `${horario.duration * 12 * 6}px`,
                                }}
                            >
                                <div className="justify-between hidden md:flex">
                                    <span>Consulta</span>
                                    <span className="">
                                        {horario.starth +
                                            ":" +
                                            horario.startm +
                                            "0"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-[18px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]  md:grid-cols-[56px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-0  ">
                        {[...Array(15)].map((_, hour) => (
                            <>
                                <span className="text-sm h-3 justify-self-end mr-1 -mt-1">
                                    {7 + hour}
                                    <span className="hidden md:inline">
                                        :00
                                    </span>
                                </span>
                                {[...Array(7).fill(null)].map((_, index) => (
                                    <span
                                        onClick={() =>
                                            console.log(
                                                `${days[index]}(${7 + hour}:00)`
                                            )
                                        }
                                        key={`${days[index]}(${7 + hour}:00)`}
                                        className={`h-3 border-t border-x border-gray-200 hover:bg-red-200 ${
                                            index > 4 ? "bg-gray-100" : ""
                                        }`}
                                    ></span>
                                ))}

                                {[...Array(4)].map((_, rowIndex) => (
                                    <>
                                        <span></span>
                                        {[...Array(7).fill(null)].map(
                                            (_, index) => (
                                                <span
                                                    onClick={() =>
                                                        console.log(
                                                            `${days[index]}(${
                                                                7 + hour
                                                            }-${rowIndex + 1}0)`
                                                        )
                                                    }
                                                    key={`${days[index]}(${
                                                        7 + hour
                                                    }-${rowIndex + 1}0)`}
                                                    className={`h-3 border-x border-gray-200 hover:bg-red-200 ${
                                                        index > 4
                                                            ? "bg-gray-100"
                                                            : ""
                                                    }`}
                                                ></span>
                                            )
                                        )}
                                    </>
                                ))}
                                <span></span>
                                {[...Array(7).fill(null)].map((_, index) => (
                                    <span
                                        onClick={() =>
                                            console.log(
                                                `${days[index]}(${7 + hour}:50)`
                                            )
                                        }
                                        key={`${days[index]}(${7 + hour}:50)`}
                                        className={`h-3 border-b border-x border-gray-200 hover:bg-red-200 ${
                                            index > 4 ? "bg-gray-100" : ""
                                        }`}
                                    ></span>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
