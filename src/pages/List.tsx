import { useNavigate } from "react-router-dom"

import data from "../datas/mock-up.json"

function List(){
    const navigate = useNavigate()

    return (
        <div className="p-6">
            <table className="w-full border-collapse bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm">
                <thead>
                <tr className="bg-sky-100/80">
                    <th className="px-4 py-3 text-center text-sky-800">상호</th>
                    <th className="px-4 py-3 text-center text-sky-800">메뉴명</th>
                    <th className="px-4 py-3 text-center text-sky-800">방문일시</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-sky-50/60 cursor-pointer border-t border-sky-100/60" onClick={() => navigate(`/detail/${item.id}`)}>
                        <td className="px-4 py-3">{item.store}</td>
                        <td className="px-4 py-3">{item.menu}</td>
                        <td className="px-4 py-3">{item.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button className="px-6 py-2 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-colors shadow-sm"
                        onClick={()=>navigate('/write')}>점심메뉴 추가</button>
            </div>
        </div>
    )
}

export default List