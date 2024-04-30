'use client';
import React from 'react';
import { QueryClient, QueryClientProvider  } from 'react-query';

// Create a client
const queryClient = new QueryClient()

const Providers = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
         {children}   
        </QueryClientProvider>
    );
};

export default Providers;