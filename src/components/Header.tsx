import { useNavigate } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/16/solid"
import { ArchiveBoxIcon } from "@heroicons/react/24/outline"

function Header(){
    const navigate = useNavigate()

    return (
       <header className="relative flex items-center justify-center px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/60 shadow-sm">
            <button onClick={() => navigate('/')} className="absolute left-6">
                <HomeIcon className="w-6 h-6 text-sky-700" />
            </button>
            <h1 className="flex items-center gap-2 text-sky-700 text-xl font-bold">
                <ArchiveBoxIcon className="w-6 h-6" />
                Lunch Box
            </h1>
        </header>
    )
}

export default Header