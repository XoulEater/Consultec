export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-gray-100">
            <aside className="w-full  h-2/3 z-10 absolute top-0 sm:hidden  flex items-end flex-col bg-[url(/pattern.png)] bg-repeat-around bg-cover  overflow-hidden">
                <div className="w-full h-full bg-radial from-black/25 to-black/45 "></div>
            </aside>
            <main className="z-10 sm:w-11/12 bg-white sm:rounded-4xl w-full sm:h-10/12 sm:max-w-[1200px] h-full sm:mt-0 mt-30 sm:max-h-[820px] flex rounded-tl-[200px] ">
                <aside className="w-1/2 hidden m-8 sm:flex items-end flex-col bg-[url(/pattern.png)]  bg-repeat-around bg-cover rounded-3xl overflow-hidden">
                    <div className="w-full h-full bg-radial from-black/25 to-black/45 "></div>
                </aside>
                <section className=" sm:w-1/2 w-full flex flex-col items-center py-32 sm:py-16 gap-6 ">
                    <div className="flex group relative justify-center items-center bg-primary rounded-full p-7 gap-2 overflow-hidden">
                        <img
                            src="/capiTEC_blanco.png"
                            className="h-32 aspect-square cursor-pointer z-10"
                            alt=""
                        />
                        <span className="absolute h-56 w-56 rounded-full bg-gradient  transition-all duration-300 group-hover:h-0 group-hover:w-0"></span>
                    </div>
                    <h1 className="text-2xl font-bold text-main text-center">
                        Inicia sesión en{" "}
                        <img
                            className="inline-block h-7 pb-1"
                            src="Consultec.png"
                            alt=""
                        />
                    </h1>
                    <p className="text-sm text-dim text-center max-w-[300px] w-3/4">
                        Bienvenido a la plataforma que unifica todas las
                        consultas
                    </p>

                    <div className="flex flex-col gap-3 items-center">
                        <input
                            type="text"
                            placeholder="Usuario"
                            className="p-3 w-[300px]  border-1 rounded-lg  border-gray-300 focus:outline-secondary"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="p-3  w-[300px]  border-1 rounded-lg  border-gray-300 focus:outline-secondary"
                        />
                    </div>

                    <button className="group relative inline-flex h-10 items-center justify-center overflow-hidden w-[300px] rounded-md bg-gradient px-6 font-medium text-neutral-200 duration-500">
                        <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
                            Iniciar sesión
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
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </button>
                </section>
            </main>
        </div>
    );
}
