import { fetchProject } from "@/apis/auth.api";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { AppDispatch, RootState } from "@/redux/store";
import type { IProject } from "@/utils/types";
import { Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const projectList = useSelector((state: RootState) => state.projectList.list)
  const dispatch = useDispatch<AppDispatch>()
  const [search, setSearch] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchProject())
  }, [dispatch])

  const filteredProjects = projectList.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))
  console.log(projectList)

  return <div className="h-[100vh] w-[100vw] flex flex-col justify-between content-between ">
    <Header />
    <main className="p-10 flex flex-col items-center gap-6">
      <div className="border w-[1200px] border-gray-100 rounded-md p-6 flex flex-col gap-6 shadow-lg text-[16px]">
        <h2 className="text-2xl font-semibold">Quản lý dự án nhóm</h2>
        <div className="flex justify-between">
          <button className="bg-[#007bff] text-white px-3 py-1 rounded-md cursor-pointer">+ Thêm dự án</button>
          <input value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 outline-none w-[300px]" type="text" placeholder="Tìm kiếm dự án"/>
        </div>
        <h2 className="text-xl font-semibold">Danh sách dự án</h2>
        <table className="w-full table-auto border border-gray-300 text-left border-collapse ">
          <thead>
            <tr className="bg-[#1e1e1e] text-white">
              <th className="text-center p-3 border border-gray-400">ID</th>
              <th className="border border-gray-400 p-3">Tên dự án</th>
              <th className="text-center border border-gray-400">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project: IProject) => (
              <tr key={project.id} className="even:bg-gray-100 odd:bg-white">
                <td className="text-center p-3">{project.id}</td>
                <td className="p-3 border-l border-r border-gray-300">{project.name}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-4 ">
                    <button className="p-4 py-1 bg-[#ffc107] rounded-md cursor-pointer">Sửa</button>
                    <button className="px-3 py-1 bg-[#dc3545] text-white rounded-md cursor-pointer">Xóa</button>
                    <button onClick={() => navigate(`/projects/${project.id}`)} className="px-3 py-1 bg-[#007bff] text-white rounded-md cursor-pointer">Chi tiết</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination align="center" defaultCurrent={1} total={50} />
    </main>
    <Footer />
  </div>;
}
