import React, { useState } from 'react';
import './Register.css';
import { Layout, Form, Input, Button, Card } from 'antd';
import Headers from '../Header/Headers';
import API from '../../config/FetchAPI';
const { Header, Footer, Content } = Layout;

function Register() {
    const [loading, setLoading] = useState(false);
    const onFinish = async (value) => {
        setLoading(true);
        await fetchAPI(value);
        window.location.href = '/login';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const fetchAPI = async (value) => {
        const Register = await API.requestPostAPI('/register', value);
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
                        <h4>Register</h4>
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
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="FullName" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email" />
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
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit" className="login-form-button">
                                Register
                            </Button>

                        </Form.Item>
                    </Form>
                </Card>
            </Content>
            <Footer></Footer>
        </Layout>
    );
}



export default Register