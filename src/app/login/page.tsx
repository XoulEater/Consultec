import LoginForm from "@/components/admin/LoginForm";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-[#1e2021] ">
            <aside className="w-full  h-2/3 z-10 absolute top-0 sm:hidden  flex items-end flex-col bg-[url(/pattern.png)] bg-repeat-around bg-cover  overflow-hidden">
                <div className="w-full h-full bg-radial from-black/25 to-black/45 "></div>
            </aside>
            <main className="z-10 sm:w-11/12 bg-bgmain sm:rounded-4xl w-full sm:h-10/12 sm:max-w-[1200px] h-full sm:mt-0 mt-30 sm:max-h-[820px] flex rounded-tl-[200px] p-8 ">
                <aside className="w-1/2 hidden  sm:flex items-end flex-col bg-[url(/pattern.png)]  bg-repeat-around bg-cover rounded-3xl overflow-hidden">
                    <div className="w-full h-full bg-radial from-black/25  to-black/45 "></div>
                </aside>
                <section className=" sm:w-1/2 w-full flex flex-col overflow-auto items-center py-32 sm:py-16 gap-6 ">
                    <div className="flex group min-h-28 relative aspect-square justify-center items-center bg-primary rounded-full p-[4%] gap-2 overflow-hidden">
                        <img
                            src="/logos/capiTEC_blanco.png"
                            className="max-h-32 w-fit cursor-pointer z-10"
                            alt=""
                        />
                        <span className="absolute h-56 w-56 rounded-full bg-gradient  transition-all duration-300 group-hover:h-0 group-hover:w-0"></span>
                    </div>
                    <h1 className="text-2xl font-bold text-main text-center">
                        Inicia sesión en{" "}
                        <img
                            className="inline-block h-7 pb-1"
                            src="/logos/consultec.svg"
                            alt=""
                        />
                    </h1>
                    <p className="text-sm text-dim text-center max-w-[300px] w-3/4">
                        Bienvenido a la plataforma que unifica todas las
                        consultas
                    </p>

                    <LoginForm />
                </section>
            </main>
        </div>
    );
}
