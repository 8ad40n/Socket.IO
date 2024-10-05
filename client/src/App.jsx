import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketID, setSocketID] = useState("");

  const socket = io("http://localhost:3000");

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", roomName);
    setRoom(roomName);
    setRoomName("");
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {room: room, message: message}
    socket.emit("message", data);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected", socket.id);
    });

    // socket.on("welcome", (s)=>{
    //   console.log(s);
    // })
    // socket.on("welcome1", (s)=>{
    //   console.log(s);
    // })

    socket.on("receive-message", (data) => {
      console.log(data); 
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className="text-center font-extralight">Welcome to Socket.IO</h1>
      {socketID}
      
      <form onSubmit={joinRoomHandler}>
        <h1>Join Room</h1>
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>

      <br /><br />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        ROOM
        <input
          type="text"
          name="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
