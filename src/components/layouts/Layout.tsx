"use client"
import Header from '../containers/Header'
import Footer from '../containers/Footer'
import { Web3Modal } from "@/context/Web3Modal"
import ToastContainer from '../baseUI/ToastContainer'
import { MyProvider } from '@/context/passport'

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Web3Modal>
          <MyProvider>
            <ToastContainer></ToastContainer>
            <Header></Header>
            {children}
            <Footer></Footer>
          </MyProvider>
        </Web3Modal>
      </body>
    </html>
  )
}
