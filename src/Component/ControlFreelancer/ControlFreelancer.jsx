// const status = ['4: done','3: review', '2: doing', '1: pendding', '0: close' ]
import { Card, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../config/FetchAPI';
import { ClockCircleOutlined, LoadingOutlined, CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './ControlJob.css';
import { Button } from 'antd/es/radio';

function ControlFreelancer() {
    const [resAccount, setResAccount] = useState([]);
    const fetchAPI = async (value) => {
        const resAPI = await API.requestGetAPI(`job/list?freelancerId=${value.freelancerDTO.id}`);
        setResAccount(resAPI.data);
    }
    useEffect(() => {
        const freelancerId = JSON.parse(localStorage.getItem('data'));
        if (freelancerId) {
            fetchAPI(freelancerId);
        }
    }, []);
    return (
        <div className='container-Job'>
            <h3>My Owner Jobs</h3>
            <Tabs
                defaultActiveKey='2'
                items={[
                    {
                        label: (
                            <div className='text-yellow-5'>
                                <ClockCircleOutlined />
                                <p>PENDING</p>
                            </div>
                        ),
                        key: '1',
                        children: (
                            <Card>
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
                                                            window.location.href = `/joF/jobId=${account.id}&freelancerId=${account.freelancerId}`;
                                                        }}
                                                        type="primary">GO TO DETAILS <ArrowRightOutlined />
                                                    </Button>
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
                            <div className='text-yellow-5'>
                                <LoadingOutlined />
                                <p>PROCESSING</p>
                            </div>
                        ),
                        key: '2',
                        children: (
                            <Card>
                                {
                                    resAccount.length === 0 ? 'You have no job.' : resAccount.map((account, index) => {
                                        if (account.status === 2) {
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
                                                    <Button
                                                        className='button-detail'
                                                        onClick={() => {
                                                            window.location.href = `/joF/jobId=${account.id}&freelancerId=${account.freelancerId}`;
                                                        }}
                                                        type="primary">GO TO DETAILS <ArrowRightOutlined /></Button>
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
                            <div className='text-yellow-5'>
                                <CheckCircleOutlined />
                                <p>SUCCESS</p>
                            </div>
                        ),
                        key: '3',
                        children: (
                            <Card>
                                {
                                    resAccount.length === 0 ? 'You have no job.' : resAccount.map((account, index) => {
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
                                                            <p dangerouslySetInnerHTML={{ __html: account?.description.slice(0, 2000) }}></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Button
                                                            className='button-detail'
                                                            onClick={() => {
                                                                window.location.href = `/joF/jobId=${account.id}&freelancerId=${account.freelancerId}`;
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

export default ControlFreelancer;
