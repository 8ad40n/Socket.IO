import React from 'react'
import { io } from "socket.io-client"

export default function App() {
  const socket = io("http://localhost:3000")
  return (
    <div>
      APP
    </div>
  )
}
