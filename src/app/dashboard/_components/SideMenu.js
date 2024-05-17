'use client';
import { Menu } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const SideMenu = () => {
    const router = useRouter();

    return (
        <Menu
            theme="dark"
            mode="inline"
            className='sticky top-0'
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <ProjectOutlined />,
                    label: 'Projects Overview',
                    onClick: () => router.push('/dashboard'),
                },
            ]}
        />
    );
};

export default SideMenu;