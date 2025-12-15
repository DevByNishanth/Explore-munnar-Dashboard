import { ArrowUpRight, Edit, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import BusTimingsActionPopup from './BusTimingsActionPopup'

const tableheader = ["Route", "Depature", "Arrival time", "Bus type", "Duration", "Price", "Action"]
const tableData = [
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
    { router: "Munnar - Coimbatore", depature: "7.30 Am", arraivalTime: "7.30Pm", busType: "Kerla RTC", duration: "5.30 Hrs", price: "280" },
]

const BusTimingsTable = ({handleEdit}) => {
    // states 
    const [isModal, setIsModal] = useState(false)
    const [toggleState, setToggleState] = useState(null)

    // functions 
    const handleModal = (actionName) => {
        setToggleState(actionName)
        setIsModal(true)
    }
    function onclose() {
        setIsModal(false)
    }

    return (
        <>
            <div className="main-section  mt-8 ">
                <section className='w-[100%]  h-[calc(100vh-110px)] overflow-auto '>
                    <table className='w-[100%]'>
                        <tr className={`btn-green text-white w-[100%]  sticky top-0`}>
                            {tableheader.map((item, index) => {
                                return <td className={`text-md py-3 px-4 ${index == 0 ? "roundedd-tl-lg" : ""} ${index == tableheader.length - 1 ? "roundedd-tr-lg" : ""} `}>{item}</td>
                            })}
                        </tr>
                        <tbody className='border border-gray-400'>
                            {tableData.map((item, index) => {
                                return <tr className={`text-[#333333] ${index % 2 == 0 ? "bg-gray-100 border-b border-gray-200" : ""} text-md `}>
                                    <td className='pl-3 py-2'>{item.router}</td>
                                    <td className='pl-3 py-2'>{item.depature}</td>
                                    <td className='pl-3 py-2'>{item.arraivalTime}</td>
                                    <td className='pl-3 py-2'>{item.busType}</td>
                                    <td className='pl-3 py-2'>{item.duration}</td>
                                    <td className='pl-3 py-2'>{item.price}</td>
                                    <td className='pl-3 py-2'>
                                        <div className="btn-container flex gap-3 items-center ml-2">
                                            <button onClick={handleEdit}><Edit className='text-green-800 w-5 h-5 cursor-pointer' /></button>
                                            <button onClick={() => { handleModal("delete") }}><Trash2 className='text-amber-800 w-5 h-5 cursor-pointer' /></button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </section>
            </div>
            {isModal && <BusTimingsActionPopup toggleState={toggleState} onclose={onclose} />}

        </>
    )
}

export default BusTimingsTable
