import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Write({addLunch, persons, category}){
    const [form, setForm] = useState({ store: '', menu:'', date:'', price:0, grade:0, persons:[], category:''})

    const navigate = useNavigate()
    const handleSave = ()=>{
        console.log("저장");
        addLunch({id : Date.now(),
                ...form
        })
    }
    const handleChange = (e)=>{
        console.log("change")
        setForm(prev=> ({...prev, [e.target.name] : e.target.value }))
    }

    return (
        <div className="flex justify-center p-8">
            <div className="w-96 bg-white border border-gray-200 rounded-xl shadow-md p-8">
                {/* 제목 */}
                <h2 className="text-xl font-bold text-sky-700 text-center mb-6">점심메뉴 추가</h2>

                {/* 입력 폼 */}
                <div className="space-y-4">

                <div>
                    <label className="block text-sm text-gray-500 mb-1">상호</label>
                    <input name="store" value={form.store} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">종류</label>
                    <select name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="">선택</option>
                        {category.map((item)=>(<option value={item.code}>{item.category}</option>))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">메뉴명</label>
                    <input name="menu" value={form.menu} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">방문일</label>
                    <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">가격</label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">₩</span>
                        <input name="price" value={form.price} onChange={handleChange} type="number" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                        <span className="text-sm text-gray-500">원</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">멤버</label>
                    <select name="persons"
                        multiple
                        value={form.persons}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, o => o.value)
                            setForm(prev => ({...prev, person: selected}))
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        {persons.map((person)=><option value={person.id}>{person.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">별점</label>
                    <div className="flex justify-end">
                        <input name="grade" value={form.grade} onChange={handleChange} type="number" min="1" max="5" className="w-20 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                    </div>
                </div>

                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-2 mt-8">
                    <button
                        onClick={() => navigate('/list')}
                        className="px-6 py-2 border border-gray-300 text-gray-500 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-sky-700 text-white text-sm font-semibold rounded-full hover:bg-sky-800 transition-colors"
                    >
                        저장
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Write