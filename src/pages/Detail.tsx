import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import data from '../datas/mock-up.json'

function Detail(){
    const {id} = useParams()
    const item = data.find((d)=>d.id === Number(id))
    const navigate = useNavigate()

    if(!item) return <div className="p-6">데이터를 찾을 수 없습니다.</div>

    return (
        <div className="flex flex-col items-center p-8">
            <div className="w-72 bg-white border border-dashed border-gray-400 rounded p-6 font-mono shadow-md">
                
                {/* 헤더 */}
                <div className="text-center border-b border-dashed border-gray-400 pb-4 mb-4">
                    <p className="text-xs text-gray-400">LUNCH BOX</p>
                    <p className="text-2xl font-bold mt-1">{item.store}</p>
                    <p className="text-gray-600 mt-1">{item.menu}</p>
                </div>

                {/* 내용 */}
                <div className="space-y-2 text-sm border-b border-dashed border-gray-400 pb-4 mb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500">방문일</span>
                        <span>{item.date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">카테고리</span>
                        <span>{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">가격</span>
                        <span>₩{Number(item.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">방문자</span>
                        <span>{item.person.join(', ')}</span>
                    </div>
                </div>

                {/* 별점 */}
                <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">RATING</p>
                    <p className="text-2xl tracking-widest">
                        {'★'.repeat(item.grade)}{'☆'.repeat(5 - item.grade)}
                    </p>
                </div>
            </div>

             {/* 버튼 */}
            <div className="flex justify-center gap-2 mt-4 w-72">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-1.5 border border-gray-300 text-gray-500 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                목록으로
                </button>
                <button
                    onClick={() => navigate(`/write/${id}`)}
                    className="px-4 py-1.5 bg-sky-700 text-white text-sm font-semibold rounded-full hover:bg-sky-800 transition-colors"
                >
                수정
                </button>
            </div>
        </div>
    )
}

export default Detail