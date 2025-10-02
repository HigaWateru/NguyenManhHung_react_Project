import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    return (
        <header className="bg-[#212529] text-white flex justify-between items-center px-[300px] py-3">
            <h3 className="text-[20px]">Quản lý dự án</h3>
            <div className="flex gap-4 text-[14px]">
                <span className="cursor-pointer">Dự án</span>
                <span className="cursor-pointer text-gray-400">Nhiệm vụ của tôi</span>
                <span onClick={() => { 
                localStorage.removeItem('currentUser')
                navigate('/login')
                }} className="cursor-pointer">Đăng xuất</span>
            </div>
        </header>
    )
}
