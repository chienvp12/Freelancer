import React, { useState, useEffect } from 'react';
import API from '../../../config/FetchAPI';
import { Button, Form, Input, message, Space, DatePicker, InputNumber } from 'antd';

const accountId = localStorage.getItem('IDAccount');
const { TextArea } = Input;
function CreateJob(props) {
    const [accountIDCheck, setAccountIDCheck] = useState([]);
    const [form] = Form.useForm();
    const fetchAPI = async (value) => {
        const resCreate = await API.requestPostAPI('api/job', value);
    }
    const getaccountID = async () => {
        const resAccount = await API.requestGetAPI(`job/list?accountId=${accountId}`)
        setAccountIDCheck(resAccount.data);
    }

    const onFinish = (fieldsValue) => {
       
            const value = {
                ...fieldsValue,
                'date': fieldsValue['date'].format('YYYY/MM/DD'),
                'type': 2,
                'accountId': accountId,
                'freelancerId': localStorage.getItem('IDFreelancer'),
            };
            fetchAPI(value);
        // message.success('Submit success!');
        // console.log(value);
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    const onFill = (record) => {
        form.setFieldsValue({
            subject: record.subject,
            description: record.description,
            salary: record.salary,

        });
    };
    useEffect(() => {

        getaccountID();
    }, []);
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Form.Item
                name="subject"
                label="Subject"
                rules={[
                    {
                        required: true,
                    },

                ]}
            >
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                    },

                ]}
            >
                <TextArea autoSize={{
                    minRows: 3,
                    maxRows: 5,
                }} />
            </Form.Item>
            <Form.Item
                name="salary"
                label="Salary"

            >
                <InputNumber placeholder="input placeholder" style={{
                    width: '100%',
                }} />
            </Form.Item>
            <Form.Item
                name="date"
                label="Date"

            >
                <DatePicker style={{
                    width: '100%',
                }}/>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Create Job
                    </Button>

                </Space>
            </Form.Item>
            <Form.Item>
                <p>Your canceled job</p>
                {
                    accountIDCheck.map((item, index) => {
                        if (item.status === 0) {
                            return (
                                <div className="job" key={index}>
                                    <div className="row">
                                        <div className="col-col-md-8">
                                            <strong>{item.subject}</strong>
                                            <p>
                                                <strong>Salary: </strong>
                                                {item.salary}$
                                            </p>
                                            <p>
                                                <strong>Response Date: </strong>
                                                {item.response_date.slice(0, 10)}
                                            </p>

                                        </div>
                                        <div className="col-md-4" >
                                            <Button onClick={() => {
                                                onFill(item);
                                            }}>Fill</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }


            </Form.Item>
        </Form>
    );
}

export default CreateJob