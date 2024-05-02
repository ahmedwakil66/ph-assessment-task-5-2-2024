'use client';
import { SettingOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import useAuthStore from '@/store/useAuthStore';

// This component clears any auth data, causing
// user to be logged out 

const LogOutBtn = () => {
    const revokeAuth = useAuthStore((state) => state.revokeAuth);
    return (
        <Button
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={revokeAuth}
        >
            Sign Out
        </Button>
    )
}

const items = [
    {
        key: '1',
        label: (
            <LogOutBtn />
        ),
    },
];

const HeaderDropdown = () => {

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Settings
                    <SettingOutlined />
                </Space>
            </a>
        </Dropdown>
    )
};
export default HeaderDropdown;