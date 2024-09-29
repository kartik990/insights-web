"use client";

import socketEvents from "@/constants/socketEvents";
import useSocket from "@/hooks/useSocket";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface CallNotification {
  fromName: string;
  fromEmail: string;
  offer: any;
}

export interface NotificationContextType {
  call: CallNotification | null;
}

export const NotificationContext = createContext<NotificationContextType>({
  call: null,
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [call, setCall] = useState<CallNotification | null>(null);

  const { socket } = useSocket();

  useEffect(() => {
    socket?.on(
      socketEvents.CALL_NOTIFICATION,
      (callDetails: CallNotification) => {
        setCall(callDetails);
      }
    );

    return () => {
      socket?.off(socketEvents.CALL_NOTIFICATION);
    };
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ call }}>
      {children}
    </NotificationContext.Provider>
  );
};
