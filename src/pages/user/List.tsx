import { useNavigate } from "react-router-dom"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import type { User } from "../../types/person"

function List({users} : {users: User[]}){
    const navigate = useNavigate()

    return (
        <div className="p-6">
            <table className="w-full border-collapse bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
                <thead>
                <tr className="bg-sky-100/80">
                    <th className="px-4 py-3 text-center text-sky-800">no</th>
                    <th className="px-4 py-3 text-center text-sky-800">이름</th>
                    <th className="px-4 py-3 text-center text-sky-800">좋아하는 분야</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-sky-50/60 cursor-pointer border-t border-sky-100/60">
                        <td className="px-4 py-3">{index+1}</td>
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.category_id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button className="px-6 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm"
                        onClick={()=>navigate('/user/write')}>사용자 추가</button>
            </div>
        </div>
    )
}


export default List