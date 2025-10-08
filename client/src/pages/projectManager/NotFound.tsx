import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const userID = localStorage.getItem("currentUser") 
    const navigate = useNavigate()
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-6'>
            <h1 className='text-5xl font-medium'>404</h1>
            <p className='text-2xl'>Not Found!</p>
            <button onClick={() => {
                if(userID) navigate('/projects')
                else navigate('/login')
            }} className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'>{userID ? 'Quay về trang chủ' : 'Quay về trang đăng nhập'}</button>
        </div>
    )
}
