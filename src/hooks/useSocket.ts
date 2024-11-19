import { SocketContext } from "@/contexts/socketContext";
import { useContext } from "react";

const useSocket = () => {
  const { socket, disconnect, connect } = useContext(SocketContext);

  return { socket, disconnect, connect };
};

export default useSocket;
