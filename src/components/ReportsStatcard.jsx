import { Bike, Car, CarFront, Hotel } from 'lucide-react'
import React from 'react'

const cardData = [
    { title: "cab booking", icon: <CarFront />, bookedCount: 230, isDecreased: true, isIncreased: false, count: 24 },
    { title: "Self drive car", icon: <Car />, bookedCount: 230, isDecreased: true, isIncreased: false, count: 24 },
    { title: "Bike rental", icon: <Bike />, bookedCount: 230, isDecreased: false, isIncreased: true, count: 24 },
    { title: "Hotel bookings", icon: <Hotel />, bookedCount: 230, isDecreased: false, isIncreased: false, count: 24 },
]

const ReportsStatcard = () => {
    return (
        <>
            <div className='col-span-5'>
                <div className="main-container grid grid-cols-2 gap-4 h-[360px]">
                    {cardData.map((item) => {
                        return <div className="card shadow-sm relative flex flex-col justify-between border shadow border-gray-200 rounded w-full py-2 px-2">
                            <h1 className='text-gray-500 text-[17px] font-medium'>{item.title}</h1>
                            <h1 className='font-medium text-4xl text-[#333333]'>{item.bookedCount}</h1>
                            <div className="container-1 flex gap-2 items-center">
                                <div className={`flex items-center gap-1 px-2 ${item.isDecreased ? "bg-red-100 text-red-700" : item.isIncreased ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}  px-1 w-fit  text-[12px] rounded`}>
                                    {item.isDecreased && <p className='font-medium'>-</p>}
                                    <h1>{item.count} %</h1>

                                </div>
                                <h1 className='text-gray-400 text-[14px]'>Since last month</h1>
                            </div>
                            <div className="icon-container absolute top-2 right-3 bg-[#c5e8ed] text-[#30aaba] w-10 h-10 rounded-full flex items-center justify-center">
                                {item.icon}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default ReportsStatcard