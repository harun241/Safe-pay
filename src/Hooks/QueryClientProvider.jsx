"use client";

import { QueryClient, QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const QueryClientProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ReactQueryProvider client={queryClient}>
            {children}
        </ReactQueryProvider>
    );
};

export default QueryClientProvider;
