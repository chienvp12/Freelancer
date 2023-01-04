import React, { useState } from 'react';
import { Layout, Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Headers from '../Header/Headers';
import './Login.css'
const { Header, Footer, Content } = Layout;

function Login() {
    const [loading, setLoading] = useState(false);
    const onFinish = async (value) => {
        setLoading(true);
        await fetchAPI(value);
        window.location.href = '/home';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchAPI = async (value) => {
        const res = await axios.post('https://ffreelancer.herokuapp.com/login', value)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('SAVED_TOKEN', res.data.accessToken);
                    localStorage.setItem('IDAccount', res.data.accountId);

                } else {
                    alert('Login Failed!')
                }
                setLoading(false);
            })
    }
    const handleRegister = () =>{
        window.location.href = '/register';
    }

    return (
            <Layout className='card-login'>
                <Header><Headers /></Header>
                <Content>
                    <Card
                        style={{
                            width: 420,
                        }}
                    >
                        <div className="header-login">
                            <h4>Login to For Freelance</h4>
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    {
                                        min: 6,
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                <div className="contact">
                                    <p>Do not have an account?</p>
                                    <Button
                                     onClick={() =>{
                                        window.location.href = '/register';
                                     }}
                                    >Register</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </Content>
                <Footer></Footer>
            </Layout>
    );
}

export default Login