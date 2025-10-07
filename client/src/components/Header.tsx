import { logout } from '@/redux/slices/account.slice'
import { type AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    const theme = React.useMemo(() => {
        if (location.pathname.startsWith('/mytask')) return 'mytask'
        return 'projects'
    }, [location.pathname])

    return (
        <header className="bg-[#212529] text-white flex justify-between items-center px-[300px] py-3">
            <h3 className="text-[20px]">Quản lý dự án</h3>
            <div className="flex gap-4 text-[14px]">
                <span onClick={() => navigate('/projects')} className={theme === 'projects' ? 'cursor-pointer text-white' : 'cursor-pointer text-gray-400'}>Dự án</span>
                <span onClick={() => navigate('/mytask')} className={theme === 'mytask' ? 'cursor-pointer text-white' : 'cursor-pointer text-gray-400'}>Nhiệm vụ của tôi</span>
                <span onClick={() => {
                    localStorage.removeItem('currentUser')
                    dispatch(logout())
                    navigate('/login')
                }}className="cursor-pointer">Đăng xuất</span>
            </div>
        </header>
    )
}
