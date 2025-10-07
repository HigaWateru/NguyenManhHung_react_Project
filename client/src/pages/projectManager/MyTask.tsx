import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

export default function MyTask() {
    return (
        <div className="h-[100vh] w-[100vw] flex flex-col justify-between">
            <Header/>
            <main className="p-10 flex flex-col items-center gap-6 overflow-auto">My Task</main>
            <Footer/>
        </div>
    )
}
