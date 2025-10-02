import type { IUser } from "@/utils/types";
import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = React.useState<{ email: string, password: string }>({ email: '', password: '' })
  const [error, setError] = React.useState<{ email: string, password: string }>({ email: '', password: '' })
  const navigate = useNavigate()

  const handleLogin = async() => {
    if(!loginData.email) {
      setError({ ...error, email: 'Email không được để trống' })
      return
    }
    if(!loginData.password) {
      setError({ ...error, password: 'Mật khẩu không được để trống' })
      return
    }
    try {
      const response = await axios.get<IUser[]>('http://localhost:3000/users')
      if(response.data) {
        const foundUser = response.data.find(user => user.email === loginData.email)
        if(!foundUser) {
          setError({ ...error, email: 'Email không tồn tại' })
          return
        }
        if(foundUser.password !== loginData.password) {
          setError({ ...error, email: '', password: 'Mật khẩu không đúng' })
          return
        }
        setError({ email: '', password: '' })
        localStorage.setItem('currentUser', foundUser.id.toString())
        navigate('/projects')
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error)
    }
  }
  return <div className="h-[100vh] w-[100vw] flex justify-center items-center">
    <div className="w-[400px] flex flex-col gap-6">
      <h1 className="text-4xl font-semibold text-center">Đăng nhập</h1>
      <form action="" onSubmit={event => { 
        event.preventDefault()
        handleLogin()
      }} className="flex flex-col gap-5 mt-4 rounded-md p-5 shadow-lg border border-gray-100">
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-semibold text-gray-600">Email</label>
          <input value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} type="email" name="email" id="email" placeholder="Địa chỉ Email" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.email}</p>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="font-semibold text-gray-600">Mật khẩu</label>
          <input value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} type="password" name="password" id="password" placeholder="Mật khẩu" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.password}</p>
        </div>
        <button type="submit" className="p-3 text-white bg-[#0d6efd] rounded-md cursor-pointer">Đăng nhập</button>
        <p className="w-full text-center text-gray-500">Chưa có tài khoản? <NavLink className='font-semibold' to="/register">Đăng ký</NavLink></p>
      </form>
    </div>
  </div>;
}
