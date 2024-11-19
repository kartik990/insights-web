import { BASE_URL } from "@/services";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext<{
  socket: SocketIOClient.Socket | null;
  disconnect: () => void;
  connect: () => void;
}>({ socket: null, disconnect: () => {}, connect: () => {} });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const skt = io(BASE_URL);
    setSocket(skt);

    return () => {
      if (skt) skt.disconnect();
    };
  }, []);

  const disconnect = () => {
    socket?.disconnect();
    setSocket(null);
  };

  const connect = () => {
    const skt = io(BASE_URL);
    setSocket(skt);
  };

  return (
    <SocketContext.Provider value={{ socket, disconnect, connect }}>
      {children}
    </SocketContext.Provider>
  );
};
