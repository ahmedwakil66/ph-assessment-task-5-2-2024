'use client';
import React, { useState } from 'react';
import { Alert, Modal, Typography } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const router = useRouter();
    const [sucMsg, setSucMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const closeModal = () => setErrMsg('');

    const onFinish = (values) => {
        if (values.username === 'admin' && values.password === '12345') {
            setSucMsg('Sign in success! Redirecting...');
            setTimeout(() => { router.push('/dashboard') }, 700)
        } else {
            setErrMsg("Username or password is invalid. Please use default username 'admin' and password '12345' to sign in.")
        }
    };

    return (
        <div className="bg-[url('https://free-images.com/or/e2ff/sunrise_sunset_colours_background.jpg')] min-h-screen flex flex-col justify-center">

            <div className="relative">
                <div className="absolute inset-0 bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg"></div>
                <div className="relative z-10 p-3 py-6">
                    {/* Success message */}
                    {sucMsg && (
                        <div className='min-h-72 flex justify-center'>
                            <Alert message={sucMsg} type="success" showIcon />
                        </div>
                    )}

                    {/* sign in form */}
                    {!sucMsg && (
                        <div className='p-3 md:p-4 border'>
                            <Typography.Title className='text-center'>
                                Sign in to your account
                            </Typography.Title>
                            <Form
                                className='w-full max-w-lg !mx-auto'
                                name="basic"
                                layout='vertical'
                                size='large'
                                onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Username is required! Default is 'admin'",
                                        },
                                        {
                                            min: 3,
                                            message: 'Username must be at least 3 char long'
                                        }
                                    ]}
                                >
                                    <Input placeholder='Enter your username, eg: admin' />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required! Default is 12345',
                                        },
                                        {
                                            min: 5,
                                            message: 'Password must be at least 5 char long'
                                        }
                                    ]}
                                >
                                    <Input.Password placeholder='Enter your password, eg: 12345' />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block className='mt-5'>
                                        Sign In
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
            </div>

            {/* Error message modal */}
            <Modal title="Error..! Invalid credential." open={errMsg !== ''} onOk={closeModal} onCancel={closeModal}>
                {errMsg}
            </Modal>
        </div>
    );
};

export default SignInPage;