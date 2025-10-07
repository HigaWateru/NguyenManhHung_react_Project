import {  fetchTodo } from '@/apis/auth.api'
import type { IMember } from '@/utils/types'
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import type { AppDispatch, RootState } from "@/redux/store";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Modal } from 'antd';

export default function ProjectIntroduce() {
  const projectTodo = useSelector((state: RootState) => state.projectDetail.project)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()

  const [addMemModal, setAddMemModal] = React.useState<boolean>(false)
  const [memDetailModal, setMemDetailModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    dispatch(fetchTodo(Number(id)))
  }, [dispatch])
    return (
        <div className='flex justify-between'>
            <div className='max-w-[650px]'>
                <h2 className='font-semibold text-2xl mb-6'>{projectTodo?.name}</h2>
                <div className='flex gap-6'>
                    <img className='w-[200px]' src={projectTodo?.image} alt="Thương mại điện tử" />
                    <p>{projectTodo?.description}</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-[400px]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-xl'>Thành viên</h2>
                    <button onClick={() => {
                        setAddMemModal(true)
                    }} className='bg-white text-gray-500 px-3 py-1 border rounded-md border-gray-500 cursor-pointer'>+ Thêm thành viên</button>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='grid grid-cols-2 mt-2 w-full'>
                        {projectTodo?.members?.map((member: IMember) => (
                            <div className='flex gap-3 items-center'>
                                <img className='w-[40px] h-[40px] rounded-3xl object-cover border border-gray-300' src="https://png.pngtree.com/png-clipart/20230925/original/pngtree-vector-template-of-tl-initials-in-handwriting-style-with-circle-logo-png-image_12769584.png" alt="" />
                                <div>
                                    <span className='font-semibold'>{member.username}</span>
                                    <p className='text-[12px]'>{member.role}</p>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div><span onClick={() => setMemDetailModal(true)} className='text-2xl font-bold px-1 rounded-4xl bg-[#e2e3e5] cursor-pointer'><EllipsisOutlined /></span></div>
                </div>
            </div>
            <Modal open={addMemModal} title='Thêm thành viên' onCancel={() => {
                setAddMemModal(false)
            }} okText='Lưu' onOk={() => {}}>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Email</label>
                    <input type="text" className="border border-gray-300 rounded-md p-3 outline-none" />
                    <p className="text-red-500 text-sm"></p>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Vai trò</label>
                    <input type="text" className="border border-gray-300 rounded-md p-3 outline-none" />
                    <p className="text-red-500 text-sm"></p>
                </div>
            </Modal>
            <Modal open={memDetailModal} title='Thành viên' onCancel={() => setMemDetailModal(false)} cancelText='Đóng' okText='Lưu'>
                {(projectTodo?.members?.length ?? 0) > 0 ? (
                    <div className='flex flex-col w-full pb-10 gap-3'>
                        <div className='flex justify-around text-2xl py-4'>
                            <span>Thành viên</span>
                            <span>Vai trò</span>
                        </div>
                        {projectTodo?.members.map((member: IMember) => (
                            <div className='flex w-full justify-between items-center'>
                                <div className='flex gap-3 items-center'>
                                    <img className='w-[40px] h-[40px] rounded-3xl object-cover border border-gray-300' src="https://png.pngtree.com/png-clipart/20230925/original/pngtree-vector-template-of-tl-initials-in-handwriting-style-with-circle-logo-png-image_12769584.png" alt="" />
                                    <div>
                                        <span className='text-[16px]'>{member.username}</span>
                                        <p className='text-[14px] text-gray-500'>{member.email}</p>
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <input className='border border-gray-300 px-2 rounded outline-none' type="text" value={member.role}/>
                                    <button className='text-red-500 cursor-pointer'><DeleteOutlined/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) : <div>Chưa có thành viên</div>
                }
            </Modal>
        </div>
    )
}