import type { IUser } from "@/utils/types"
import axios from "axios"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function Register() {
  const [formData, setFormData] = React.useState<{ name: string, email: string, password: string, confirm_password: string }>({ name: '', email: '', password: '', confirm_password: '' })
  const [error, setError] = React.useState<{ name: string, email: string, password: string, confirm_password: string }>({ name: '', email: '', password: '', confirm_password: '' })
  const [isSubmit, setIsSubmit] = React.useState(false)
  const navigate = useNavigate()

  const validate = (): boolean => {
    const errors = { name: '', email: '', password: '', confirm_password: '' }
    if(!formData.name) errors.name = 'Họ tên không được để trống'
    if(!formData.email) errors.email = 'Email không được để trống'
    if(!formData.password) errors.password = 'Mật khẩu không được để trống'
    else if(formData.password.trim().length < 8) errors.password = 'Mật khẩu phải tối thiểu 8 ký tự'
    if(formData.password !== formData.confirm_password) errors.confirm_password = 'Mật khẩu xác nhận không đúng'
    setError(errors)
    return !errors.name && !errors.email && !errors.password && !errors.confirm_password
  }

  const handleRegister = async() => {
    if(!validate()) return
    try {
      const response = await axios.get<IUser[]>('http://localhost:3000/users')
      if(response.data) {
        const foundUser = response.data.find((user: IUser) => user.email === formData.email)
        if(foundUser) {
          setError({ ...error, email: 'Email đã tồn tại' })
          return
        } else {
          setError({ name: '', email: '', password: '', confirm_password: '' })
          setIsSubmit(true)
          await axios.post('http://localhost:3000/users', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            projects: []
          })
          setTimeout(() => {navigate('/login')}, 2000)
        }
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error)
    }
  }

  return <div className="h-[100vh] w-[100vw] flex justify-center items-center">
    <div className="w-[400px] flex flex-col gap-6">
      <h1 className="text-4xl font-semibold text-center">Đăng ký</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleRegister()
      }} action="" className="flex flex-col gap-5 mt-4 rounded-md p-5 shadow-lg border border-gray-100">
        <div className="flex flex-col gap-3">
          <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" name="name" id="name" placeholder="Họ và tên" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.name}</p>
        </div>
        <div className="flex flex-col gap-3">
          <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" name="email" id="email" placeholder="Địa chỉ Email" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.email}</p>
        </div>
        <div className="flex flex-col gap-3">
          <input value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="Mật khẩu" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.password}</p>
        </div>
        <div className="flex flex-col gap-3">
          <input value={formData.confirm_password} onChange={e => setFormData({ ...formData, confirm_password: e.target.value })} type="password" name="confirm_password" id="confirm_password" placeholder="Xác nhận mật khẩu" className="border border-gray-300 rounded-md p-3 outline-none"/>
          <p className="text-red-500 text-sm">{error.confirm_password}</p>
        </div>
        <p className="text-green-500 text-sm">{isSubmit && '✓ Đăng ký thành công!'}</p>
        <button type="submit" className="p-3 text-white bg-[#0d6efd] rounded-md cursor-pointer">Đăng ký</button>
        <p className="w-full text-center text-gray-500">Đã có tài khoản? <NavLink className='font-semibold' to="/login">Đăng nhập</NavLink></p>
      </form>
    </div>
  </div>
}
