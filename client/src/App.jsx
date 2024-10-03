import { useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Connected", socket.id);
    })
    socket.on("welcome", (s)=>{
      console.log(s);
    })
    socket.on("welcome1", (s)=>{
      console.log(s);
    })
  },[])

  return (
    <div>
      APP
    </div>
  )
}
