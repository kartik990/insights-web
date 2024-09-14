"use client";

import SocketEvents from "@/constants/socketEvents";
import { UserContext } from "@/contexts/userContext";
import useSocket from "@/hooks/useSocket";
import { SendHorizontal, Video } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    { isMine: true, message: "hi" },
    { isMine: false, message: "hi" },
    { isMine: true, message: "hi" },
  ]);
  const toName = "user2";
  const toEmail = "user2@gmail.com";

  const { user } = useContext(UserContext);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !user) return;

    const handleMessage = (data: { fromEmail: string; message: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          message: data.message,
          isMine: data.fromEmail === user?.email,
        },
      ]);
    };

    socket.on(SocketEvents.CHAT_MESSAGE, handleMessage);

    return () => {
      socket.off(SocketEvents.CHAT_MESSAGE, handleMessage);
    };
  }, [socket, user]);

  const handleSubmit = () => {
    if (!inputMessage) return;

    if (!socket) {
      alert("not connected to internet");
      return;
    }

    socket.emit(SocketEvents.CHAT_MESSAGE, {
      formEmail: user?.email,
      message: inputMessage,
      toEmail,
    });

    setInputMessage("");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-[85%] flex">
        <div className="w-[30%] px-2  flex flex-col justify-end gap-2">
          <div className="px-4 shadow-md py-2 flex gap-4 items-center bg-white rounded-lg">
            <Image
              alt="avatar"
              src="/images/avatar1.jpeg"
              width={65}
              height={65}
              className="w-12 rounded-full"
            />
            <div>
              <div className="text-lg font-semibold text-foreground">
                kartik
              </div>
              <div className="text-md  text-foreground">Hello</div>
            </div>
            <div className="text-sm self-start mt-1">10-08-2024</div>
          </div>
          <div className="px-4 pl-2 border-l-8 border-primary shadow-md py-2 relative flex gap-4 items-center bg-white rounded-lg">
            <Image
              alt="avatar"
              src="/images/avatar1.jpeg"
              width={65}
              height={65}
              className="w-12 rounded-full"
            />
            <div>
              <div className="text-lg font-semibold text-foreground">
                kartik
              </div>
              <div className="text-md  text-foreground">Hello brother</div>
            </div>
            <div className="text-sm absolute top-3 right-2">10-08-2024</div>
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-col gap-2 ">
          <div className="w-full bg-white h-full rounded-xl shadow-md px-4 flex flex-col justify-end relative overflow-y-scroll text-primary max-h-[500px]">
            {messages.map((message, idx) => {
              return message.isMine ? (
                <div className="chat chat-end" key={idx}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        alt=""
                        src="/images/avatar1.jpeg"
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-primary text-white">
                    {message.message}
                  </div>
                  <div className="chat-footer">
                    {user?.name}
                    <time className="text-xs opacity-80 ml-2">12:46</time>
                  </div>
                </div>
              ) : (
                <div className="chat chat-start" key={idx}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        alt="avatar"
                        src="/images/avatar1.jpeg"
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                  <div className="chat-bubble text-white bg-primary max-w-72">
                    {message.message}
                  </div>
                  <div className="chat-footer mt-1">
                    {toName}
                    <time className="text-xs ml-4">12:45</time>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white h-14 rounded-xl shadow-md px-2 flex justify-between pr-0 text-primary overflow-hidden ">
            <input
              className="h-full w-full bg-transparent px-2 outline-none text-primary"
              type="text"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
            />
            <button
              className="bg-primary text-white px-4"
              onClick={handleSubmit}
            >
              <SendHorizontal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
