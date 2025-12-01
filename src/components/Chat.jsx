import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { Base_URL } from "../utils/constant";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const User = useSelector((store) => store.user);
  const storeUser = User?._id;
  const firstName = User?.firstName;
  const lastName=User?.lastName

  const getChat = async () => {
    try {
      const res = await axios.get(Base_URL + "/chat/" + id, {
        withCredentials: true,
      });
      console.log(res.data);

      const chatMessage = res.data?.message.map((eachmsg) => {
        return {
          firstName: eachmsg.senderId?.firstName,
          lastName: eachmsg.senderId?.lastName,
          text: eachmsg?.text,
        };
      });

      setMessage(chatMessage)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getChat();
  },[]);

  useEffect(() => {
    if (!storeUser) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, storeUser, id });

    socket.on("messageRecieved", ({ firstName,lastName, text }) => {
      console.log(firstName + " " + text);
      setMessage((message) => [...message, { firstName,lastName, text }]);
    });
    
    return () => {
      socket.disconnect();
    };
  }, [storeUser, id]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName,lastName, storeUser, id, text: newMessage });
    setNewMessage("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md h-[500px] flex flex-col bg-white rounded-xl shadow-md border">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h1 className="text-lg font-semibold">Chat</h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
          {/* Example message from others */}

          {message.map((eachmsg, index) => (
            <div key={index} className={`flex flex-col ${firstName === eachmsg.firstName?'items-end':'items-start'}`}>
              <p className={` text-sm ${firstName===eachmsg.firstName?"text-green-400":"text-blue-400"}`}>{`${eachmsg.firstName}  ${eachmsg.lastName}`}</p>
              <div className="max-w-fit rounded-lg px-3 py-2 bg-white shadow text-sm">
                {eachmsg.text} 
              </div>
            </div>
          ))}

          {/* Example message from you */}
          {/* <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg px-3 py-2 bg-blue-500 text-white shadow text-sm">
              Hi, how are you?
            </div>
          </div> */}
        </div>

        {/* Input area */}
        <form
          className="border-t px-3 py-2 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            // handle send here
          }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="px-4 py-2 text-sm font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
