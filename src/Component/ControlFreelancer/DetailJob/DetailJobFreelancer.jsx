import { FieldTimeOutlined, MailOutlined, UserOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Input, InputNumber, Space, Upload, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import './DetailJob.css';
import { useLocation } from "react-router-dom";
import API from '../../../config/FetchAPI';
function DetailJobFree() {
  const location = useLocation();
  const [detailJob, setDetailJob] = useState([]);
  const [detailInfo, setDetailInfo] = useState([]);
  const [infoFreelancer, setinfoFreelancer] = useState([]);
  const [updateJob, setUpdateJob] = useState(null);
  const getDetailJob = async () => {
    const resDetail = await API.requestGetAPI(`api/job/${location.pathname.slice(11, 13)}`);
    const resInfo = await API.requestGetAPI(`api/users/information`);
    const resInfoFree = await API.requestGetAPI(`v1/freelancers/${location.pathname.slice(27)}`);
    setDetailJob(resDetail);
    setDetailInfo(resInfo);
    setinfoFreelancer(resInfoFree.data);
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (value) => {
    const handleFile = await API.requestPutAPI('api/job/update', {
      ...detailJob,
      result: value.upload[0].name,
      status: 3,
    })
  }

  const handlGetJob = async () => {
    const getJob = await API.requestPutAPI('api/job/update', {
      ...detailJob,
      status: 2,
    })
    window.location.href = '/job-freelancer';

  }
  const handleReject = async () => {
    const resReject = await API.requestPutAPI('api/job/update', {
      ...detailJob,
      status: 0,
    })
    window.location.href = '/job-freelancer';
  }
  useEffect(() => {
    getDetailJob();
  }, []);

  return (
    <div className="wrapper-container">
      <h3>See what job you had</h3>
      <div className="row">
        <div className="col-md-7">
          <p className="text-h4">{detailJob?.subject}</p>
          <div className="salary">
            <p>Salary</p>
            <InputNumber
              prefix="$"
              style={{ width: '100%' }}
              name="salary"
              value={detailJob?.salary}
              disabled
            />
          </div>
          <p className='description-change'>{detailJob.description}</p>
          <div className="info">
            <div className="col-md-4">
              <div className="flex">
                <UserOutlined />
                <div className="name">
                  <strong>Name</strong>
                  <p>{infoFreelancer.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="flex">
                <MailOutlined />
                <div className="name">
                  <strong>Email</strong>
                  <p>{detailInfo.email}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="flex">
                <FieldTimeOutlined />
                <div className="name">
                  <strong>Time line</strong>
                  <p>{detailJob.created_at?.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card-container">
            <Card
              title={"Status: " + (detailJob.status === 1 ? 'Pending' :
                detailJob.status === 2 ? 'Doing' :
                  detailJob.status === 4 ? 'Done' : '')}
              style={{
              }}
            >
              <div>
                {detailJob.status === 1 ?
                  <div>
                    <Button onClick={handlGetJob}>Get Job</Button>
                    <Button onClick={handleReject}>Skip job</Button>
                  </div>
                  :
                  detailJob.status === 2 ?
                    <Form name="validate_other" onFinish={onFinish}>
                      <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload name="logo">
                          <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        wrapperCol={{
                          span: 12,
                          offset: 6,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                    :
                    detailJob.status === 4 ?
                      <Space wrap className='space-check'>
                        <p>{detailJob.result}</p>
                        <Button type="primary" icon={<DownloadOutlined />}>
                          Download
                        </Button>
                      </Space> :
                      detailJob.status === 3 ?
                        <div  >
                          <Space>
                            <p>{detailJob.result}</p>
                            <Button type="primary" icon={<DownloadOutlined />}>
                              Download
                            </Button>
                          </Space>
                          <div>

                          </div>
                        </div> : ''
                }
              </div>
            </Card>
          </div>
          <div className="q-card">
            <div className="text-chat"></div>
            <div className="button-send row">
              <div className="col-md-9">
                <Input className='input-type' />
              </div>
              <div className="col-md-3">
                <Button className='button-type'>SEND</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailJobFree;