"use client"
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

export default function Page() {
  const [cosigner, setCosigner] = useState("")
  const [list, setList] = useState<Array<string>>([])
  const [text, setText] = useState("")
  useEffect(() => {
    const storedCosigner = localStorage.getItem('cosigner')
    if (storedCosigner) {
      setCosigner(storedCosigner)
    }
    const storedList = localStorage.getItem('list')
    if (storedList) {
      setList(JSON.parse(storedList))
    }
  }, [])
  useEffect(() => {
    if (cosigner !== "") {
      localStorage.setItem('cosigner', cosigner)
    }
    if (list.length > 0) {
      localStorage.setItem('list', JSON.stringify(list))
    }
  }, [cosigner, list])

  //保存list方法
  const saveList = () => {
    console.log("saveList", text)
    let list = text.split(",")
    setList(list)
  }
  //批量mint方法
  const loopMint = () => {
    console.log("loopMint", typeof list, list.length, list[0], list)
  }
  //清空方法
  const clearData = () => {
    setCosigner("")
    setList([])
    setText("")
    localStorage.clear()
  }
  return (
    <>
      {cosigner == "" ?
        <>
          <div>设置签名者</div>
          <input type="text" onChange={(e) => setCosigner(e.target.value)} />
        </>
        : list.length == 0 ?
          <>
            <div>添加数组</div>
            <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button onClick={saveList}>添加</button>
          </>
          :
          <>
            <ul>
              {list.map((item, index) => {
                return <li key={index}>{item}</li>
              })}
            </ul>
            <div onClick={loopMint}>开始mint</div>
            <button type='button' onClick={clearData}>清空</button>
          </>

      }
    </>

  )
}
