import React from 'react'

const LoadingPage = () => {
    return (
        <>
            <div className="fixed inset-0 z-80 tint-blur"></div>
            <section className='h-screen '>
                <span className='loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-100 '></span>
            </section>
        </>
    )
}

export default LoadingPage