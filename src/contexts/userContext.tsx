"use client";

import SocketEvents from "@/constants/socketEvents";
import useSocket from "@/hooks/useSocket";
import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
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

  const addUser = (userData: User) => {
    setUser(userData);
    if (socket) {
      socket.emit(SocketEvents.USER_DETAILS, { email: userData.email });
    }
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
