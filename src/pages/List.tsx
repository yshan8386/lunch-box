import { useNavigate } from "react-router-dom"

import data from "../datas/mock-up.json"

function List(){
    const navigate = useNavigate()

    return (
        <div className="p-6">
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-center">상호</th>
                    <th className="border px-4 py-2 text-center">메뉴명</th>
                    <th className="border px-4 py-2 text-center">방문일시</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 cursor-pointer"  onClick={() => navigate(`/detail/${item.id}`)}>
                        <td className="border px-4 py-2">{item.store}</td>
                        <td className="border px-4 py-2">
                            {item.menu}
                        </td>
                        <td className="border px-4 py-2">{item.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="p-6">
                <div className="flex justify-end mb-4">
                    <button  className="mt-4 px-6 py-2 bg-sky-700 text-white text-sm font-semibold rounded-full hover:bg-sky-700 transition-colors"
                            onClick={()=>navigate('/write')}>점심메뉴 추가</button>
                </div>
            </div>
        </div>
    )
}

export default List