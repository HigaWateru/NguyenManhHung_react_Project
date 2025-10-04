import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store"; 
import { login } from "@/apis/auth.api";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { error, currentUser } = useSelector((state: RootState) => state.account)

  const [loginData, setLoginData] = React.useState({ email: "", password: "" })
  const [formError, setFormError] = React.useState({ email: "", password: "" })

  React.useEffect(() => {
    if (currentUser) navigate("/projects")
  }, [currentUser, navigate])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginData.email) return setFormError({ ...formError, email: "Email không được để trống" })
    if (!loginData.password) return setFormError({ ...formError, password: "Mật khẩu không được để trống" })
    dispatch(login(loginData))
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="w-[400px] flex flex-col gap-6">
        <h1 className="text-4xl font-semibold text-center">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4 p-5 shadow-lg border border-gray-100 rounded-md">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Email</label>
            <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="border border-gray-300 rounded-md p-3 outline-none"/>
            <p className="text-red-500 text-sm">{formError.email || error}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Mật khẩu</label>
            <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="border border-gray-300 rounded-md p-3 outline-none"/>
            <p className="text-red-500 text-sm">{formError.password}</p>
          </div>
          <button type="submit" className="p-3 bg-blue-600 text-white rounded-md">Đăng nhập</button>
          <p className="text-center">Chưa có tài khoản? <NavLink to="/register">Đăng ký</NavLink></p>
        </form>
      </div>
    </div>
  )
}
