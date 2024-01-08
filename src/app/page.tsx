"use client"
import Image from 'next/image'
import Link from 'next/link'
// import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'

export default function Home() {
  // const { open } = useWeb3Modal()
  // const { open: isOpen } = useWeb3ModalState()
  // console.log(open, isOpen)

  return (
    //工具集列表，每个指向一个工具链接，并有描述
    // <div className="flex flex-col justify-center items-center">
    //   <div className="flex flex-col justify-center items-center">
    //     <h1 className="text-4xl font-bold">工具集</h1>
    //     <div className="flex flex-col justify-center items-center">
    //       <Link href={"/owner-mint"} target='_blanck'>OwnerMint</Link>
    //        </div>
    //     <div className="flex flex-col justify-center items-center">批量mint</div>
    //     <div className="flex flex-col justify-center items-center">批量转账</div>
    //   </div>
    // </div>
    <section>
      <div className="hero" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">欢迎使用Web3工具集</h1>
            <p className="mb-5">整理收集常用web3工具</p>
            <button className="btn btn-primary">了解更多</button>
          </div>
        </div>
      </div>
    </section>
  )
}
