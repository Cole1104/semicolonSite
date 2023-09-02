import Navi from "./Navi"
export default function Main(){
    return(
        <>
        <Navi/>
        <div className=" mt-16 text-black">
            <main className="relative max-w-lg ml-auto mr-auto">

            
            


            <article className="w-screen pt-10 p-5 max-w-fit">

                <section className="bg-white pb-8 p-2 rounded-2xl">
                <h1 className="text-5xl p-10">Random CHAT</h1>
                <a href="/">
                <button type="button"   class=" h-14 max-w-64 w-4/5 text-gray-900 bg-slate-300 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Go to chat</button>
                </a>
                <h3 className=" text-left py-5">
                드디어 오픈... <br/>
                한번에 두 명씩 매칭되며 사이트를 새로고침 할시 <br/>연결이 끊어지므로 주의 해 주세요 <br/>
                신고 기능도 구현되어 있으며 관리자 검토 후 영구정지를 당할수 있습니다
                </h3>

                
            
                </section>
            
                <section className="bg-slate-700 text-white p-4 rounded-2xl">
                Used Stack: <br/>
                next.js, tailwind, Socket.io, express
                </section>

            </article>


    


            </main>
            <footer></footer>
        </div>
        </>
    )
}