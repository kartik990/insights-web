import { SocketContext } from "@/contexts/socketContext";
import { useContext } from "react";

const useSocket = () => {
  const { socket, disconnect } = useContext(SocketContext);

  return { socket, disconnect };
};

export default useSocket;
