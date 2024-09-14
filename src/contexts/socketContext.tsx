import { BASE_URL } from "@/services";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext<{
  socket: SocketIOClient.Socket | null;
  disconnect: () => void;
}>({ socket: null, disconnect: () => {} });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const skt = io(BASE_URL);
    setSocket(skt);

    return () => {
      skt.disconnect();
    };
  }, []);

  const disconnect = () => {
    socket?.disconnect();
    setSocket(null);
  };

  return (
    <SocketContext.Provider value={{ socket, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
