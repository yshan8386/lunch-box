import { useNavigate } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/16/solid"

function Header(){
    const navigate = useNavigate()

    return (
       <header className="relative flex items-center justify-center px-6 py-4 shadow">
            <button onClick={() => navigate('/')} className="absolute left-6">
                <HomeIcon className="w-6 h-6 text-sky-700" />
            </button>
            <h1 className="text-sky-700 text-xl font-bold">Lunch Box</h1>
        </header>
    )
}

export default Header