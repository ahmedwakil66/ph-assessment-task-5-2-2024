'use client';

import useThemeStore from '@/store/useThemeStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider, theme } from "antd";

// Create a client
const queryClient = new QueryClient()

const Providers = ({ children }) => {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
                }}
            >
                {children}
            </ConfigProvider>
        </QueryClientProvider>
    );
};

export default Providers;