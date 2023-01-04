// const status = ['4: done','3: review', '2: doing', '1: pendding', '0: close' ]
import { Card, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../config/FetchAPI';
import { ClockCircleOutlined, LoadingOutlined, CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './ControlJob.css';
import { Button } from 'antd/es/radio';

const acountId = localStorage.getItem('IDAccount');
function ControlJob() {
    const [resAccount, setResAccount] = useState([]);
    const [accountCheck, setAccountCheck] = useState(null);

    const fetchAPI = async () => {
        const resAPI = await API.requestGetAPI(`job/list?accountId=${acountId}`);
        setResAccount(resAPI.data);
    }

    const getaccount = (record) => {
        setAccountCheck({ ...record })
    }
    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <div className='container-Job'>
            <h3>My Owner Jobs</h3>
            <Tabs
                defaultActiveKey='2'
               
                items={[

                    {
                        label: (
                            <div className='text-yellow-9'>
                                <ClockCircleOutlined />
                                <p>PENDING</p>
                            </div>
                        ),
                        key: '1',
                        children: (
                            <Card title="Job pending">
                                {
                                 resAccount.length === 0 ? 'You have no job.' : resAccount.map((account, index) => {
                                        if (account.status === 1) {
                                            return (
                                                <div key={index} className="row account-item">
                                                    <div className="col-md-8">
                                                        <div className="subject">
                                                            <p>{account.subject}</p>
                                                        </div>
                                                        <div className="salary">
                                                            <p>
                                                                <strong>Salary: </strong>
                                                                {account.salary}$
                                                            </p>
                                                        </div>
                                                        <div className="response-date">
                                                            <p>
                                                                <strong>Response Date: </strong>
                                                                {account.created_at.slice(0, 10)}
                                                            </p>
                                                        </div>
                                                        <div className="descripttion">
                                                            <p>{account.description}</p>
                                                        </div>
                                                    </div>
                                                    <Button className='button-detail'
                                                        onClick={() => {
                                                            window.location.href = `/job/jobId=${account.id}&freelancerId=${account.freelancerId}`;

                                                        }}
                                                    >GO TO DETAILS <ArrowRightOutlined /></Button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Card>
                        )
                    },
                    {
                        label: (
                            <div className='text-yellow-9'>
                                <LoadingOutlined />
                                <p>PROCESSING</p>
                            </div>
                        ),
                        key: '2',
                        children: (
                            <Card title="Job processing">
                                {
                                    resAccount.length === 0 ? 'You have no job.' :  resAccount.map((account, index) => {
                                        if (account.status === 2 || account.status === 3 ) {
                                            return (
                                                <div key={index} className="row account-item">
                                                    <div className="col-md-8">
                                                        <div className="subject">
                                                            <p>{account.subject}</p>

                                                        </div>
                                                        <div className="salary">
                                                            <p>
                                                                <strong>Salary: </strong>
                                                                {account.salary}$
                                                            </p>
                                                        </div>
                                                        <div className="response-date">
                                                            <p>
                                                                <strong>Response Date: </strong>
                                                                {account.created_at.slice(0, 10)}
                                                            </p>
                                                        </div>
                                                        <div className="descripttion">
                                                            <p>{account.description}</p>
                                                        </div>
                                                    </div>
                                                    <Button className='button-detail'
                                                        onClick={() => {
                                                            window.location.href = `/job/jobId=${account.id}&freelancerId=${account.freelancerId}`;

                                                        }}
                                                    >GO TO DETAILS <ArrowRightOutlined /></Button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Card>
                        )
                    },
                    {
                        label: (
                            <div className='text-yellow-9'>
                                <CheckCircleOutlined />
                                <p>SUCCESS</p>
                            </div>
                        ),
                        key: '4',
                        children: (
                            <Card title="Job success">
                                {
                                    resAccount.length === 0 ? 'You have no job.' :   resAccount.map((account, index) => {
                                        if (account.status === 4) {
                                            return (
                                                <div key={index} className="row account-item">
                                                    <div className="col-md-8">
                                                        <div className="subject">
                                                            <p>{account.subject}</p>

                                                        </div>
                                                        <div className="salary">
                                                            <p>
                                                                <strong>Salary: </strong>
                                                                {account.salary}$
                                                            </p>
                                                        </div>
                                                        <div className="response-date">
                                                            <p>
                                                                <strong>Response Date: </strong>
                                                                {account.created_at.slice(0, 10)}
                                                            </p>
                                                        </div>
                                                        <div className="descripttion">
                                                            <p>{account.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Button
                                                        className='button-detail'
                                                            onClick={() => {
                                                                window.location.href = `/job/jobId=${account.id}&freelancerId=${account.freelancerId}`;

                                                            }}

                                                        >GO TO DETAILS <ArrowRightOutlined /></Button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </Card>
                        )
                    }
                ]}

            >
            </Tabs>
        </div>
    )
}

export default ControlJob
