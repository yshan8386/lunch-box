import { useState } from "react"
import { useNavigate } from "react-router-dom"

import type { Lunch, Menu } from '../../types/lunch'
import type { Person } from '../../types/person'
import type { Category } from '../../types/category'

interface WriteProps {
    addLunch: (item: Lunch) => void
    persons: Person[]
    category: Category[]
}

const emptyMenu = (): Menu => ({ id: Date.now(), menu: '', person: 0, person_nm: '', price: 0, grade: 0 })

function Write({ addLunch, persons, category }: WriteProps) {
    const [form, setForm] = useState({ store: '', date: '', category: 0, category_nm: '' })
    const [menus, setMenus] = useState<Menu[]>([emptyMenu()])

    const navigate = useNavigate()

    const handleSave = () => {
        addLunch({ id: Date.now(), ...form, menus })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addMenu = () => {
        setMenus(prev => [...prev, emptyMenu()])
    }

    const deleteMenu = (index: number) => {
        setMenus(prev => prev.filter((_, i) => i !== index))
    }

    const handleMenuChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setMenus(prev => prev.map((m, i) => i === index ? { ...m, [e.target.name]: e.target.value } : m))
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
                    <label className="block text-sm text-gray-500 mb-1">카테고리</label>
                    <select name="category" value={form.category} onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="">선택</option>
                        {category.map((item) => (<option key={item.code} value={item.code}>{item.category}</option>))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">방문일</label>
                    <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>

                {/* 추가 버튼 */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={addMenu}
                        className="px-4 py-1.5 bg-sky-50 border border-sky-300 text-sky-600 text-sm font-semibold rounded-full hover:bg-sky-100 transition-colors"
                    >
                        + 추가
                    </button>
                </div>

                {/* 메뉴 목록 */}
                {menus.map((menu, index) => (
                    <div key={menu.id}>
                        <div className="flex items-center gap-2 mb-4">
                            <hr className="flex-1 border-dashed border-gray-300" />
                            <button type="button" onClick={() => deleteMenu(index)}
                                className="px-4 py-1.5 bg-red-50 border border-red-300 text-red-500 text-sm font-semibold rounded-full hover:bg-red-100 transition-colors"
                            >
                                삭제
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">메뉴명</label>
                                <input name="menu" value={menu.menu} onChange={(e) => handleMenuChange(index, e)} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">가격</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">₩</span>
                                    <input name="price" value={menu.price} onChange={(e) => handleMenuChange(index, e)} type="number" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                                    <span className="text-sm text-gray-500">원</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">멤버</label>
                                <select name="person" value={menu.person} onChange={(e) => handleMenuChange(index, e)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                >
                                    <option value="">선택</option>
                                    {persons.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-500 mb-1">별점</label>
                                <div className="flex justify-end">
                                    <input name="grade" value={menu.grade} onChange={(e) => handleMenuChange(index, e)} type="number" min="1" max="5" className="w-20 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-2 mt-8">
                    <button
                        onClick={() => navigate('/lunch/list')}
                        className="px-6 py-2 bg-white border border-gray-300 text-gray-500 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
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
