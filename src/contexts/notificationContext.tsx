"use client";

import socketEvents from "@/constants/socketEvents";
import useSocket from "@/hooks/useSocket";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { UserContext } from "./userContext";

interface CallNotification {
  fromName: string;
  fromEmail: string;
  offer: any;
  showCard: boolean;
}

export interface NotificationContextType {
  call: CallNotification | null;
  declineCall: (email?: string) => void;
  hideCard: () => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  call: null,
  declineCall() {},
  hideCard() {},
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [call, setCall] = useState<CallNotification | null>(null);

  const { socket } = useSocket();

  const { user } = useContext(UserContext);

  useEffect(() => {
    socket?.on(
      socketEvents.CALL_NOTIFICATION,
      (callDetails: CallNotification) => {
        setCall({ ...callDetails, showCard: true });
      }
    );

    return () => {
      socket?.off(socketEvents.CALL_NOTIFICATION);
    };
  }, [socket]);

  const hideCard = () => {
    if (call) setCall({ ...call, showCard: false });
  };

  const declineCall = () => {
    socket?.emit(socketEvents.CALL_REJECTED, {
      email: call?.fromEmail,
    });
    setCall(null);
  };

  return (
    <NotificationContext.Provider value={{ call, declineCall, hideCard }}>
      {children}
    </NotificationContext.Provider>
  );
};
