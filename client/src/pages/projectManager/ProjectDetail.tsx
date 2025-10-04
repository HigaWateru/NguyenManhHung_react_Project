import { fetchTodo } from "@/apis/auth.api";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectIntroduce from "@/components/ProjectIntroduce";
import type { AppDispatch, RootState } from "@/redux/store";
import type { Todo } from "@/utils/types";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const [search, setSearch] = React.useState('')
  const projectTodo = useSelector((state: RootState) => state.projectDetail.project)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()

  const [tableOpt, setTableOpt] = React.useState<{todo: boolean, inProgress: boolean, pending: boolean, done: boolean}>({todo: true, inProgress: true, pending: false, done: false})

  React.useEffect(() => {
    dispatch(fetchTodo(Number(id)))
  }, [dispatch])

  return <div className="h-[100vh] w-[100vw] flex flex-col justify-between  ">
    <Header />
    <main className="p-10 flex flex-col items-center gap-6">
      <div className="w-[1200px] text-[16px] flex flex-col gap-6">
        <ProjectIntroduce/>
        <div className="flex justify-between">
          <button className="bg-[#007bff] text-white px-3 py-1 rounded-md cursor-pointer">+ Thêm nhiệm vụ</button>
          <div className="flex gap-4">
            <Select style={{ width: 200, height: 40 }} placeholder="Sắp xếp theo" optionFilterProp="children" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} options={[
              { value: 'todo', label: 'To do' }, 
              { value: 'inprogress', label: 'In progress' }, 
              { value: 'done', label: 'Done' }
            ]} />
            <input value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 outline-none w-[300px]" type="text" placeholder="Tìm kiếm nhiệm vụ"/>
          </div>
        </div>
      </div>
      <div className="border w-[1200px] border-gray-100 rounded-md p-6 flex flex-col gap-6 shadow-xl text-[16px]">
        <h2 className="text-xl font-semibold">Danh sách nhiệm vụ</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Tên Nhiệm Vụ</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Người phụ trách</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Ưu tiên</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Ngày bắt đầu</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Hạn chót</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Tiến độ</th>
              <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => setTableOpt({...tableOpt, todo: !tableOpt.todo})} className="border border-gray-300"><td className="p-2 font-semibold text-[14px] cursor-pointer">{tableOpt.todo ? <CaretDownOutlined /> : <CaretRightOutlined/>} Todo</td></tr>
            {projectTodo?.todos?.filter((todo: Todo) => todo.status === 'to-do' && todo.title.toLowerCase().includes(search.toLowerCase())).map((todo: Todo) => (
              <tr key={todo.id} className={tableOpt.todo ? '' : 'hidden'}>
                <td className="p-2 border border-gray-300">{todo.title}</td>
                <td className="text-center border border-gray-300">{todo.personChange.username}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.priority === 'low' ? 'bg-[#0dcaf0]' : todo.priority === 'medium' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.priority === 'low' ? 'Thấp' : todo.priority === 'medium' ? 'Trung bình' : 'Cao'}</span></td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.startDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.endDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.progress === 'scheduled' ? 'bg-[#198754]' : todo.progress === 'in-progress' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.progress === 'scheduled' ? 'Đúng tiến độ' : todo.progress === 'in-progress' ? 'Có rủi ro' : 'Trễ hạn'}</span></td>
                <td className="text-center border border-gray-300">
                  <div className="flex justify-center gap-3 ">
                    <button className="p-3 py-1 bg-[#ffc107] text-[14px] rounded-md cursor-pointer">Sửa</button>
                    <button className="px-3 py-1 bg-[#dc3545] text-[14px] text-white rounded-md cursor-pointer">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
            <tr onClick={() => setTableOpt({...tableOpt, inProgress: !tableOpt.inProgress})} className="border border-gray-300"><td className="p-2 font-semibold text-[14px] cursor-pointer">{tableOpt.inProgress ? <CaretDownOutlined /> : <CaretRightOutlined/>} In Progress</td></tr>
            {projectTodo?.todos?.filter((todo: Todo) => todo.status === 'in-progress' && todo.title.toLowerCase().includes(search.toLowerCase())).map((todo: Todo) => (
              <tr key={todo.id} className={tableOpt.inProgress ? '' : 'hidden'}>
                <td className="p-2 border border-gray-300">{todo.title}</td>
                <td className="text-center border border-gray-300">{todo.personChange.username}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.priority === 'low' ? 'bg-[#0dcaf0]' : todo.priority === 'medium' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.priority === 'low' ? 'Thấp' : todo.priority === 'medium' ? 'Trung bình' : 'Cao'}</span></td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.startDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.endDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.progress === 'scheduled' ? 'bg-[#198754]' : todo.progress === 'in-progress' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.progress === 'scheduled' ? 'Đúng tiến độ' : todo.progress === 'in-progress' ? 'Có rủi ro' : 'Trễ hạn'}</span></td>
                <td className="text-center border border-gray-300">
                  <div className="flex justify-center gap-3 ">
                    <button className="p-3 py-1 bg-[#ffc107] text-[14px] rounded-md cursor-pointer">Sửa</button>
                    <button className="px-3 py-1 bg-[#dc3545] text-[14px] text-white rounded-md cursor-pointer">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="border border-gray-300"><td className="p-2 font-semibold text-[14px] cursor-pointer"><CaretRightOutlined /> Pending</td></tr>
            {projectTodo?.todos?.filter((todo: Todo) => todo.status === 'pending' && todo.title.toLowerCase().includes(search.toLowerCase())).map((todo: Todo) => (
              <tr key={todo.id} className="">
                <td className="p-2 border border-gray-300">{todo.title}</td>
                <td className="text-center border border-gray-300">{todo.personChange.username}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.priority === 'low' ? 'bg-[#0dcaf0]' : todo.priority === 'medium' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.priority === 'low' ? 'Thấp' : todo.priority === 'medium' ? 'Trung bình' : 'Cao'}</span></td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.startDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.endDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.progress === 'scheduled' ? 'bg-[#198754]' : todo.progress === 'in-progress' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.progress === 'scheduled' ? 'Đúng tiến độ' : todo.progress === 'in-progress' ? 'Có rủi ro' : 'Trễ hạn'}</span></td>
                <td className="text-center border border-gray-300">
                  <div className="flex justify-center gap-3 ">
                    <button className="p-3 py-1 bg-[#ffc107] text-[14px] rounded-md cursor-pointer">Sửa</button>
                    <button className="px-3 py-1 bg-[#dc3545] text-[14px] text-white rounded-md cursor-pointer">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="border border-gray-300"><td className="p-2 font-semibold text-[14px] cursor-pointer"><CaretRightOutlined /> Done</td></tr>
            {projectTodo?.todos?.filter((todo: Todo) => todo.status === 'done' && todo.title.toLowerCase().includes(search.toLowerCase())).map((todo: Todo) => (
              <tr key={todo.id} className="">
                <td className="p-2 border border-gray-300">{todo.title}</td>
                <td className="text-center border border-gray-300">{todo.personChange.username}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.priority === 'low' ? 'bg-[#0dcaf0]' : todo.priority === 'medium' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.priority === 'low' ? 'Thấp' : todo.priority === 'medium' ? 'Trung bình' : 'Cao'}</span></td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.startDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300 text-blue-600">{new Date(todo.endDate).toLocaleDateString('vi-VN')}</td>
                <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${
                  todo.progress === 'scheduled' ? 'bg-[#198754]' : todo.progress === 'in-progress' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                }`}>{todo.progress === 'scheduled' ? 'Đúng tiến độ' : todo.progress === 'in-progress' ? 'Có rủi ro' : 'Trễ hạn'}</span></td>
                <td className="text-center border border-gray-300">
                  <div className="flex justify-center gap-3 ">
                    <button className="p-3 py-1 bg-[#ffc107] text-[14px] rounded-md cursor-pointer">Sửa</button>
                    <button className="px-3 py-1 bg-[#dc3545] text-[14px] text-white rounded-md cursor-pointer">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody className="bg-white divide-y divide-gray-200"></tbody>
        </table>
      </div>
    </main>
    <Footer />
  </div>;
}
