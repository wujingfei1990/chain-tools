"use client"
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <header className="bg-gray-200 text-center py-4">
      <div className="container mx-auto px-4">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost text-xl">Web3工具集</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><Link href={"/passport"}>PassPort</Link></li>
              <li><Link href={"/owner-mint"}>OwnerMint</Link></li>
              <li>
                <details>
                  <summary>
                    批量工具
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li><a>批量铸造</a></li>
                    <li><a>批量转账</a></li>
                  </ul>
                </details>
              </li>
                <w3m-button size="sm" balance="hide" />
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
