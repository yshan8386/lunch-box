export interface Lunch {
    id: number
    date : string
    store: string
    category: number
    category_nm: string
    menus : Menu[]
}


export interface Menu{
    id: number
    menu: string
    person: number
    person_nm: string
    price: number
    grade: number
}

