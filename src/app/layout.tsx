// "use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layouts/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web3 工具集',
  description: 'web3 tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-4">
          {children}
        </div>
      </main>
    </Layout>

  )
}
