'use client';
import useAuthStore from '@/store/useAuthStore';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const MonitorAuthState = () => {
    const router = useRouter();
    const path = usePathname();
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
    console.log('isLoggedIn', isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) router.push('/dashboard')
        if (!isLoggedIn) router.push('/sign-in')

    }, [isLoggedIn, router])

    // Mock protecting private route
    if(!isLoggedIn && path !== '/sign-in') return (
        <p className='fixed top-0 left-0 h-screen w-screen z-50 bg-white flex justify-center items-center'>
            <LoadingOutlined width={200} height={200} className='text-8xl'/>
        </p>
    )

    return null;
};

export default MonitorAuthState;