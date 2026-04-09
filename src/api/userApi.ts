import type { User } from "../types/user"

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users/')  // 프록시가 백엔드로 전달
  if (!res.ok) throw new Error('유저 목록을 불러오지 못했습니다.')
  return res.json()
}

export async function addUsers(): Promise<User>{
    const res= await fetch('/api/users/')
}