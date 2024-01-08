"use client"
import { useEffect, useState } from 'react'
import NFTJSON from "@/abi/onft.json"
// import NFTJSON from "@/abi/onftGoerli.json"
import { toast } from 'react-toastify';

import { useAccount, useNetwork, useContractRead, useContractWrite } from "wagmi"

import { useMyContext } from "@/context/passport";

export default function Page() {
  const { passportState: passportInstance, userInfo, dispatch } = useMyContext();
  const [buttonState, setButtonState] = useState(userInfo?.email ? "Logout" : "Connect Passport")
  useEffect(()=>{
    console.log("userInfo:",userInfo)
  },[userInfo])

  const login = async () => {
    if (!passportInstance) return
    setButtonState("Connecting...")
    try {
      const providerZkevm = passportInstance.connectEvm()

      const accounts = await providerZkevm.request({ method: "eth_requestAccounts" })
      console.log("accounts:", accounts)
      const balance = await providerZkevm.request({
        method:"eth_getBalance",
        params:[
          accounts[0],
          "latest"
        ]
      })
      const b = parseInt(balance, 16)
      console.log("balance:", b)
      // Set the address
      dispatch({
        type: 'add_user_info',
        key: 'address',
        value: accounts[0]
      })
      const user = await passportInstance.getUserInfo()


      // Set the email
      dispatch({
        type: 'add_user_info',
        key: 'email',
        value: user.email
      })

      //set the nickname
      dispatch({
        type: 'add_user_info',
        key: 'nickname',
        value: user.nickname
      })

      const accessToken = await passportInstance.getAccessToken()


      // set the access token
      dispatch({
        type: 'add_user_info',
        key: 'accessToken',
        value: accessToken
      })


      const idToken = await passportInstance.getIdToken()

      // set the id token
      dispatch({
        type: 'add_user_info',
        key: 'idToken',
        value: idToken
      })

    } catch (error) {
      alert("Something went wrong. Please try again")
      console.log({ error })
      setButtonState('Connect Passport')
    } finally {

    }
    setButtonState('Logout')
    return
  }

  const logout = async () => {
    await passportInstance.logout();
    setButtonState('Connect Passport')
  }

  // const { isConnected, address, connector } = useAccount()
  // const { chain } = useNetwork()
  // // console.log(isConnected, address, connector, chain)

  // const [to, setTo] = useState<`0x${string}`>() //mint地址
  // const [amount, setAmount] = useState<number>(0) //mint数量
  // const contractAddress = NFTJSON.address as `0x${string}` //合约地址
  // const abi = NFTJSON.abi //合约abi
  // const [owner, setOwner] = useState<`0x${string}`>() //owner地址

  // const contractReadOwner = useContractRead({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "owner",
  // })

  // useEffect(() => {
  //   console.log("contractReadOwner", contractReadOwner)
  //   if (!contractReadOwner.isError) {
  //     setOwner(contractReadOwner.data as `0x${string}`)
  //     setTo(contractReadOwner.data as `0x${string}`)
  //   }
  // }, [])

  // const contractWriteOwnerMint = useContractWrite({
  //   address: contractAddress,
  //   abi: abi,
  //   functionName: "ownermint",
  //   onSuccess(data) {
  //     console.log('Success', data)
  //     toast.success("mint success")
  //   },
  //   onError(error) {
  //     console.log('Error', error)
  //     toast.error("mint error")
  //   }
  // })
  // const mint = async () => {
  //   const time = Math.floor(new Date().getTime() / 1000)
  //   console.log("to", to)
  //   console.log("amount", amount)
  //   console.log("time", time)
  //   contractWriteOwnerMint.write({ args: [to, amount, time] })
  // }

  return (
    <section>
      <button className='btn btn-info' onClick={buttonState === "Logout" ? logout : login}>{buttonState}</button>
      {/* <h1 className="text-4xl py-4">OwnerMint</h1>
      <label className="block my-4">
        <span className="block">铸造地址</span>
        <input type="text" placeholder="address" className="input input-bordered w-full max-w-md" value={to} defaultValue={owner} onChange={(e) => setTo(e.target.value as `0x${string}`)} />
      </label>
      <label className="block my-4">
        <span className='block'>铸造数量</span>
        <input type="text" className="input input-bordered w-full max-w-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <button className='btn btn-info' onClick={() => mint()}>mint</button> */}
    </section>
  )
}
