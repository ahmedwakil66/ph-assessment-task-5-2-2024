'use client';
import Providers from '@/providers/Providers';
import HeaderDropdown from './_components/HeaderDropdown';
import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import SideMenu from './_components/SideMenu';
const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {

    return (
        <Providers>
            <Layout>
                <Sider
                    breakpoint='md'
                    collapsedWidth={40}
                    collapsible
                    className='relative'
                >
                    <div className="demo-logo-vertical h-14" />
                    <SideMenu />
                </Sider>


                <Layout>
                    <Header
                        className='!px-2 flex justify-end'
                    >
                        <HeaderDropdown />
                    </Header>

                    <Content
                        className='mx-3 md:mx-4 my-6 px-3 md:px-6 py-6 !min-h-[calc(100vh-180px)]'
                    >
                        {children}
                    </Content>

                    <Footer className='text-center'>
                        SKILL ASSESSMENT TASK ©{new Date().getFullYear()} Created by
                        <a href="https://kwa.netlify.app"> Kazi Wakil Ahmed</a>
                    </Footer>
                </Layout>
            </Layout>
        </Providers>
    );
};

export default DashboardLayout;