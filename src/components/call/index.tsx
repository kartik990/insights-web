"use client";

import socketEvents from "@/constants/socketEvents";
import { NotificationContext } from "@/contexts/notificationContext";
import { UserContext } from "@/contexts/userContext";
import useSocket from "@/hooks/useSocket";
import { useContext, useEffect, useRef, useState } from "react";
import Peer, { Instance as SimplePeerInstance } from "simple-peer";
import CallCards from "./CallCards";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/user";
import { Member } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { PhoneCall } from "lucide-react";

interface CallProps {}

const Call: React.FC<CallProps> = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<SimplePeerInstance | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);

  const { user } = useContext(UserContext);
  const { call, declineCall } = useContext(NotificationContext);

  const [showMembers, setShowMembers] = useState(!call);
  const [showJoinCallButton, setShowJoinCallButton] = useState<boolean>(!!call);

  const { toast } = useToast();

  const { socket } = useSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const members = data?.data as Member[];

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        ``;
        setMyStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });
  }, []);

  const acceptCall = () => {
    setShowJoinCallButton(false);
    setShowCancelButton(true);

    if (call && myStream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: myStream,
      });

      peer.on("signal", (signal) => {
        socket?.emit(socketEvents.CALL_ACCEPTED, {
          to: call.fromEmail,
          answer: signal,
        });
      });

      peer.signal(call.offer);
      peerRef.current = peer;

      if (remoteVideoRef?.current) {
        peerRef.current?.on("stream", (stream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
        });
      }
    }
  };

  const initiateCall = (email: string) => {
    if (!myStream || !socket) return;

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    peer.on("signal", (signal) => {
      socket.emit(socketEvents.CALL, {
        fromName: user?.name,
        fromEmail: user?.email,
        to: email,
        offer: signal,
      });
    });

    setShowMembers(false);

    socket.on(socketEvents.CALL_REJECTED, () => {
      peer.destroy();
      peerRef.current = null;
      setShowMembers(true);
      toast({
        variant: "theme",
        title: "Call Rejected",
        description: "The Other Person declined the call",
      });
    });

    peerRef.current = peer;

    socket?.on(socketEvents.CALL_READY, ({ answer }: { answer: any }) => {
      console.log(answer);

      peerRef.current?.signal(answer);

      if (remoteVideoRef?.current) {
        peerRef.current?.on("stream", (stream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }

          setShowCancelButton(true);
        });
      }
    });
  };

  const disconnectCall = () => {
    setShowCancelButton(false);
    declineCall();

    if (peerRef?.current) peerRef.current.destroy();
    peerRef.current = null;
    setShowMembers(true);

    toast({
      variant: "theme",
      title: "Call Disconnected",
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <div className="flex gap-16 justify-center items-center">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-80 bg-white rounded-lg shadow-lg border-8 border-primary "
          ></video>
          {showMembers ? (
            <CallCards
              initiateCall={initiateCall}
              members={members?.filter((mem) => mem.email != user?.email)}
            />
          ) : (
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-full h-80 bg-white rounded-lg shadow-lg border-8 border-primary "
            ></video>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {showJoinCallButton && (
          <button
            className="px-4 py-2 bg-primary text-white flex gap-2 rounded animate-bounce"
            onClick={acceptCall}
          >
            <PhoneCall /> Join Call
          </button>
        )}
        {showCancelButton && (
          <button
            className="px-4 py-2 bg-primary text-white flex gap-2 rounded animate-bounce"
            onClick={disconnectCall}
          >
            Disconnect Call
          </button>
        )}
      </div>
    </div>
  );
};

export default Call;
