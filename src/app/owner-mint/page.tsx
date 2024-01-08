"use client"
import { useEffect, useState } from 'react'
import NFTJSON from "@/abi/onft.json"
// import NFTJSON from "@/abi/onftGoerli.json"
import { toast } from 'react-toastify';

import { useAccount, useNetwork, useContractRead, useContractWrite } from "wagmi"

export default function Page() {

  const { isConnected, address, connector } = useAccount()
  const { chain } = useNetwork()
  // console.log(isConnected, address, connector, chain)

  const [to, setTo] = useState<`0x${string}`>() //mint地址
  const [amount, setAmount] = useState<number>(0) //mint数量
  const contractAddress = NFTJSON.address as `0x${string}` //合约地址
  const abi = NFTJSON.abi //合约abi
  const [owner, setOwner] = useState<`0x${string}`>() //owner地址

  const contractReadOwner = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "owner",
  })

  useEffect(() => {
    console.log("contractReadOwner", contractReadOwner)
    if (!contractReadOwner.isError) {
      setOwner(contractReadOwner.data as `0x${string}`)
      setTo(contractReadOwner.data as `0x${string}`)
    }
  }, [])

  const contractWriteOwnerMint = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "ownermint",
    onSuccess(data) {
      console.log('Success', data)
      toast.success("mint success")
    },
    onError(error) {
      console.log('Error', error)
      toast.error("mint error")
    }
  })
  const mint = async () => {
    const time = Math.floor(new Date().getTime() / 1000)
    console.log("to", to)
    console.log("amount", amount)
    console.log("time", time)
    contractWriteOwnerMint.write({ args: [to, amount, time] })
  }

  return (
    <section>
      <h1 className="text-4xl py-4">OwnerMint</h1>
      <label className="block my-4">
        <span className="block">铸造地址</span>
        <input type="text" placeholder="address" className="input input-bordered w-full max-w-md" value={to} defaultValue={owner} onChange={(e) => setTo(e.target.value as `0x${string}`)} />
      </label>
      <label className="block my-4">
        <span className='block'>铸造数量</span>
        <input type="text" className="input input-bordered w-full max-w-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <button className='btn btn-info' onClick={() => mint()}>mint</button>
    </section>
  )
}
