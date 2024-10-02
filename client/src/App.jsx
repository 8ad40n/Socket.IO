import { useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Connected", socket.id);
    })
  },[])

  return (
    <div>
      APP
    </div>
  )
}
