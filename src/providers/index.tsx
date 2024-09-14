"use client";

import { SocketProvider } from "@/contexts/socketContext";
import { UserProvider } from "@/contexts/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <UserProvider>
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
