"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Home() {
  return (
    <ToastContainer
      position="top-right"
      theme="dark"
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      style={{ width: "auto", maxWidth: "600px" }}
    />
  )
}
