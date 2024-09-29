"use client";

import { NotificationProvider } from "@/contexts/notificationContext";
import { SocketProvider } from "@/contexts/socketContext";
import { UserProvider } from "@/contexts/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <UserProvider>
          <NotificationProvider>
            {children} <ReactQueryDevtools initialIsOpen={false} />
          </NotificationProvider>
        </UserProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default Providers;
