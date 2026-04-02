import { useNavigate } from "react-router-dom"
import { HomeIcon, Bars3Icon, ChartBarIcon, UserGroupIcon, TagIcon } from "@heroicons/react/16/solid"
import { ArchiveBoxIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

function Header(){
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
       <header className="relative flex items-center justify-center px-6 py-4 bg-white/40 backdrop-blur-md border-b border-white/60 shadow-sm z-50">
            {/*왼쪽 버튼*/}
            <div className="absolute left-6 flex items-center gap-3">
                <button onClick={()=>setMenuOpen(!menuOpen)}>
                    <Bars3Icon className="w-6 h-6 text-sky-700" />    
                </button>
            </div>

            <h1 className="flex items-center gap-2 text-sky-700 text-xl font-bold cursor-pointer"
                onClick={() => navigate('/')}>
                <ArchiveBoxIcon className="w-6 h-6" />
                Lunch Box
            </h1>

            {/*서브메뉴*/}
            {menuOpen && (
                <div className="absolute top-full left-0 bg-white/90 backdrop-blur-md border border-white/64 shadow-md rounded-br-xl z-50 w-56">
                    <button onClick={()=>{navigate('/'); setMenuOpen(false)}}
                         className="w-full text-left px-5 py-3 text-sm text-sky-700 hover:bg-sky-100 hover:text-sky-900 hover:pl-7 transition-all duration-150 flex items-center gap-2">
                        <HomeIcon className="w-4 h-4" />홈
                    </button>
                    <button onClick={()=>{navigate('/lunch/list'); setMenuOpen(false)}}
                          className="w-full text-left px-5 py-3 text-sm text-sky-700 hover:bg-sky-100 hover:text-sky-900 hover:pl-7 transition-all duration-150 flex items-center gap-2">
                        <ArchiveBoxIcon className="w-4 h-4" />점심메뉴 히스토리
                    </button>
                    <button onClick={()=>{navigate('/statistics'); setMenuOpen(false)}}
                         className="w-full text-left px-5 py-3 text-sm text-sky-700 hover:bg-sky-100 hover:text-sky-900 hover:pl-7 transition-all duration-150 flex items-center gap-2">
                        <ChartBarIcon className="w-4 h-4" />점심메뉴 통계
                    </button>
                    <button onClick={()=>{navigate('/user/list'); setMenuOpen(false)}}
                         className="w-full text-left px-5 py-3 text-sm text-sky-700 hover:bg-sky-100 hover:text-sky-900 hover:pl-7 transition-all duration-150 flex items-center gap-2">
                        <UserGroupIcon className="w-4 h-4" />사용자 관리
                    </button>
                    <button onClick={()=>{navigate('/category/list'); setMenuOpen(false)}}
                         className="w-full text-left px-5 py-3 text-sm text-sky-700 hover:bg-sky-100 hover:text-sky-900 hover:pl-7 transition-all duration-150 flex items-center gap-2">
                        <TagIcon className="w-4 h-4" />카테고리 관리
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header