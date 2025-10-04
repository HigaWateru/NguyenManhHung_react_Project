import {  fetchTodo } from '@/apis/auth.api'
import type { IMember } from '@/utils/types'
import { EllipsisOutlined } from '@ant-design/icons'
import type { AppDispatch, RootState } from "@/redux/store";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ProjectIntroduce() {
  const projectTodo = useSelector((state: RootState) => state.projectDetail.project)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()

  React.useEffect(() => {
    dispatch(fetchTodo(Number(id)))
  }, [dispatch])
    return (
        <div className='flex justify-between'>
            <div className='max-w-[700px]'>
                <h2 className='font-semibold text-2xl mb-6'>{projectTodo?.name}</h2>
                <div className='flex gap-6'>
                    <img className='w-[200px]' src="https://www.way.com.vn/vnt_upload/news/02_2020/10-trang-thuong-mai-dien-tu-hang-dau-the-gioi-hien-nay.jpg" alt="Thương mại điện tử" />
                    <p>{projectTodo?.description}</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-[400px]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-xl'>Thành viên</h2>
                    <button className='bg-white text-gray-500 px-3 py-1 border rounded-md border-gray-500 cursor-pointer'>+ Thêm thành viên</button>
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
                    <div><span className='text-2xl font-bold px-1 rounded-4xl bg-[#e2e3e5] cursor-pointer'><EllipsisOutlined /></span></div>
                </div>
            </div>
        </div>
    )
}