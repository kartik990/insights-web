"use client";

import SocketEvents from "@/constants/socketEvents";
import useSocket from "@/hooks/useSocket";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  userId: string;
  name: string;
  email: string;
  profile?: string;
}

export interface UserContextType {
  user: User | null;
  addUser: (userData: User) => void;
  removeUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  addUser: () => {},
  removeUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const { socket } = useSocket();

  useEffect(() => {
    if (socket && user) {
      socket.emit(SocketEvents.USER_DETAILS, { email: user.email });
    }
  }, [socket, user]);

  const addUser = (userData: User) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
