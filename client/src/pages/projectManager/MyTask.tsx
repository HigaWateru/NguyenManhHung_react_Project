import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { fetchMyTask } from '@/apis/auth.api'
import type { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import React from 'react'
import { CaretDownOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons'

export default function MyTask() {
    const [search, setSearch] = React.useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const projects = useSelector((state: RootState) => state.mytask.projects) || []
    const [showTask, setShowTask] = React.useState<number[]>([])

    const toggleTask = (projectId: number) => setShowTask(prev => prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId])

    console.log(projects)

    React.useEffect(() => {
        dispatch(fetchMyTask({ search }))
    }, [dispatch, search])
    return (
        <div className="h-[100vh] w-[100vw] flex flex-col justify-between">
            <Header />
            <main className="p-10 flex flex-col items-center gap-6 overflow-auto">
                <div className='flex flex-col justify-between w-[1200px]'>
                    <h2 className='font-semibold text-2xl mb-6 w-full self-start'>Quản lý nhiệm vụ</h2>
                    <div className="flex gap-4 w-full justify-end">
                        <Select style={{ width: 200, height: 40 }} placeholder="Sắp xếp theo" optionFilterProp="children" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} options={[
                            { value: 'todo', label: 'To do' },
                            { value: 'inprogress', label: 'In progress' },
                            { value: 'done', label: 'Done' }
                        ]} />
                        <input value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 outline-none w-[300px]" type="text" placeholder="Tìm kiếm nhiệm vụ" />
                    </div>
                </div>
                <div className="border w-[1200px] border-gray-100 rounded-md p-6 flex flex-col gap-6 shadow-xl text-[16px]">
                    <h2 className="text-xl font-semibold">Danh sách nhiệm vụ</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Tên Nhiệm Vụ</th>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Ưu tiên</th>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Ngày bắt đầu</th>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Hạn chót</th>
                                <th scope="col" className="px-6 py-3 text-center border border-gray-300 text-[14px] font-semibold">Tiến độ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <React.Fragment key={project.id}>
                                    <tr onClick={() => toggleTask(project.id)} className="border border-gray-300"><td className="p-2 font-semibold text-[14px] cursor-pointer">{project.name} {showTask.includes(project.id) ? <CaretDownOutlined /> : <CaretRightOutlined />}</td></tr>
                                    {project.tasks.map(task => (
                                        <tr key={task.id} className={showTask.includes(project.id) ? '' : 'hidden'}>
                                            <td className="p-2 border border-gray-300">{task.name}</td>
                                            <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${task.priority === 'low' ? 'bg-[#0dcaf0]' : task.priority === 'medium' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                                            }`}>{task.priority === 'low' ? 'Thấp' : task.priority === 'medium' ? 'Trung bình' : 'Cao'}</span></td>
                                            <td className='text-center border border-gray-300 cursor-pointer font-medium'>{task.status === 'to-do' ? 'Todo' : task.status === 'in-progress' ? 'In Progress' : task.status === 'pending' ? 'Pending' : 'Done'} <EditOutlined/></td>
                                            <td className="text-center border border-gray-300 text-blue-600">{new Date(task.startDate).toLocaleDateString('vi-VN')}</td>
                                            <td className="text-center border border-gray-300 text-blue-600">{new Date(task.endDate).toLocaleDateString('vi-VN')}</td>
                                            <td className="text-center border border-gray-300"><span className={`text-white font-medium text-[12px] px-2 py-1 rounded ${task.progress === 'scheduled' ? 'bg-[#198754]' : task.progress === 'in-progress' ? 'bg-[#ffc107]' : 'bg-[#dc3545]'
                                            }`}>{task.progress === 'scheduled' ? 'Đúng tiến độ' : task.progress === 'in-progress' ? 'Có rủi ro' : 'Trễ hạn'}</span></td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    )
}
