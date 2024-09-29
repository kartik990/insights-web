"use client";

import SocketEvents from "@/constants/socketEvents";
import { UserContext } from "@/contexts/userContext";
import useSocket from "@/hooks/useSocket";
import { getChats, getOldMessages } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, SendHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

interface MessagesProps {}

const Messages: React.FC<MessagesProps> = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      message: string;
      isMine: boolean;
    }[]
  >([]);
  const [metaData, setMetaData] = useState<{
    page: number;
    pageSize: number;
    totalMessages: number;
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    profileUrl: string;
    conversationId: number;
  } | null>();

  const { user } = useContext(UserContext);
  const { socket } = useSocket();

  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  if (!user) {
    router.push("/auth/sign-in");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(user?.userId as string),
  });

  //@ts-ignore
  const chats = data?.data?.chats;

  console.log(chats);

  useEffect(() => {
    const func = async () => {
      if (!selectedUser?.conversationId) return;

      const res = await getOldMessages(selectedUser?.conversationId);

      //@ts-ignore
      const messages = res?.data?.messages?.map((message) => ({
        message: message.content,
        isMine: message.senderId === user?.userId,
      }));

      console.log(res.data);

      //@ts-ignore
      setMetaData(res?.data?.metaData);
      setMessages(messages);
    };
    func();
  }, [selectedUser, user]);

  const nextMessagesBatch = async () => {
    if (!metaData || !selectedUser) return;

    if (metaData?.page * metaData?.pageSize < metaData?.totalMessages) {
      const res = await getOldMessages(
        selectedUser?.conversationId,
        +metaData.page + 1
      );

      //@ts-ignore
      const messages = res?.data?.messages?.map((message) => ({
        message: message.content,
        isMine: message.senderId === user?.userId,
      }));

      console.log(res.data);

      //@ts-ignore
      setMetaData(res?.data?.metaData);
      setMessages((prev) => [...prev, ...messages]);
    }
  };

  useEffect(() => {
    if (!socket || !user) return;

    const handleMessage = (data: { fromEmail: string; message: string }) => {
      console.log(data);

      setMessages((prev: any) => [
        {
          message: data.message,
          isMine: data.fromEmail === user?.email,
        },
        ...prev,
      ]);

      if (containerRef?.current) {
        containerRef.current.scrollTop = containerRef?.current?.scrollHeight;
      }
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

    console.log("emiting", user);

    socket.emit(SocketEvents.CHAT_MESSAGE, {
      fromEmail: user?.email,
      message: inputMessage,
      toEmail: selectedUser?.email,
    });

    setInputMessage("");

    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef?.current?.scrollHeight;
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-[85%] flex">
        <div className="min-w-max px-2  flex flex-col justify-end gap-2">
          <Link
            href="/member"
            className="w-full flex justify-center gap-2 items-center p-4 border-dashed border-2 border-primary font-bold rounded-md text-foreground cursor-pointer"
          >
            <CirclePlus /> Add member
          </Link>

          {chats?.map((chat: any, idx: number) => {
            const otherUser = chat.users.filter(
              (u: any) => u.user.email != user?.email
            )[0].user;

            return (
              <div
                key={idx}
                className={`px-4 cursor-pointer shadow-md py-2 flex gap-4 items-center bg-white rounded-lg
                  ${
                    selectedUser?.email == otherUser?.email
                      ? "border-r-8 border-primary"
                      : ""
                  }`}
                onClick={() =>
                  setSelectedUser({
                    id: otherUser?.id,
                    name: otherUser?.name,
                    email: otherUser?.email,
                    profileUrl: otherUser?.profileUrl,
                    conversationId: chat?.id,
                  })
                }
              >
                {otherUser?.profileUrl ? (
                  <Image
                    alt="avatar"
                    src={otherUser?.profileUrl}
                    width={65}
                    height={65}
                    className="w-12 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex justify-center items-center">
                    {otherUser?.name[0]}
                  </div>
                )}
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {otherUser?.name}
                  </div>
                  <div className="text-sm text-foreground">{`${new Date(
                    chat.updatedAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[70%] h-full flex flex-col gap-2 ">
          <div
            ref={containerRef}
            className="w-full flex flex-col-reverse  bg-white h-[500px] rounded-xl shadow-md px-4 py-2  overflow-y-scroll text-primary  scrollbar-thumb-primary scrollbar-track-transparent scrollbar-thin"
          >
            {messages.map((message: any, idx: number) => {
              return message.isMine ? (
                <div className="chat chat-end " key={idx}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {user?.profile ? (
                        <Image
                          alt=""
                          src={user?.profile}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div className="text-white text-bold bg-primary w-10 h-10 rounded-full flex justify-center items-center text-lg">
                          {user?.name[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="chat-bubble bg-primary text-white">
                    {message.message}
                  </div>
                </div>
              ) : (
                <div className="chat chat-start " key={idx}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {selectedUser?.profileUrl ? (
                        <Image
                          alt="avatar"
                          src={selectedUser?.profileUrl}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <div className="text-white text-bold bg-primary w-10 h-10 rounded-full flex justify-center items-center text-lg">
                          {user?.name[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="chat-bubble text-white bg-primary max-w-72">
                    {message.message}
                  </div>
                </div>
              );
            })}
            {metaData &&
              metaData?.page * metaData.pageSize < metaData.totalMessages && (
                <div
                  onClick={nextMessagesBatch}
                  className="w-full p-2 text-primary text-center hover:bg-secondary cursor-pointer transition-all ease-in duration-200 mb-1 rounded-lg"
                >
                  Load More
                </div>
              )}
          </div>
          <div className="bg-white h-14 rounded-xl shadow-md px-2 flex justify-between pr-0 text-primary overflow-hidden ">
            <input
              className="h-full w-full bg-transparent px-2 outline-none text-primary"
              type="text"
              placeholder="Type your message here..."
              value={inputMessage}
              onKeyDown={(e) => (e.key == "Enter" ? handleSubmit() : null)}
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
