'use client';

import React, { useState } from 'react';
import Providers from '@/providers/Providers';
import { ProjectOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { useRouter } from 'next/navigation';
const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                breakpoint='md'
                collapsedWidth={40}
                collapsible
                className='relative'
            // collapsed={collapsed}
            // trigger={<div>Button</div>}
            >
                <div className="demo-logo-vertical h-1" />
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
            </Sider>

            <Providers>
                <Layout>
                    <Header
                        className='!p-0'
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        {/* <p>SKILL ASSESSMENT TASK</p> */}
                    </Header>

                    <Content
                        className='mx-3 md:mx-4 my-6 px-3 md:px-6 py-6 !min-h-[calc(100vh-180px)]'
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>

                    <Footer className='text-center'>
                        SKILL ASSESSMENT TASK ©{new Date().getFullYear()} Created by
                        <a href="https://kwa.netlify.app"> Kazi Wakil Ahmed</a>
                    </Footer>
                </Layout>
            </Providers>
        </Layout>
    );
};

export default DashboardLayout;