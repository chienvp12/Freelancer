import { FieldTimeOutlined, MailOutlined, UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Input, InputNumber, Space, Modal, Rate } from 'antd';
import React, { useState, useEffect } from 'react';
import './DetailJob.css';
import API from '../../config/FetchAPI';
import { useSearchParams, useParams, useLocation } from "react-router-dom";
const { TextArea } = Input;
function DetailJob() {

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
  const onChange = (e) => {
    setUpdateJob(() => {
      return {
        ...detailJob,
        salary: e
      }
    });
  }
  const updateSalary = async (value) => {
    const resUpdate = await API.requestPutAPI('api/job/update', value);
    window.location.href = '/jobs';
  }
  const handleClickUpdate = async (e) => {
    await updateSalary(updateJob);
    e.preventDefault();
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [feedback, setFeeback] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);

  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const updateJobDone = await API.requestPutAPI('api/job/update', {
      ...feedback,
      status: 4,
    });
    

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRate = (e) => {
    setFeeback(() => {
      return {
        ...detailJob,
        rate: e
      }
    });
  }
  const handleFeedback = (e) => {
    setFeeback(() => {
      return {
        ...feedback,
        comment: e.target.value,
      }
    });
  }
  const handleReject = async (e) =>{
    const resReject = await API.requestPutAPI('api/job/update', {
      ...detailJob,
      status: 2,
      result: '',
    })
    getDetailJob();
    e.preventDefault();
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
              onChange={onChange}
              disabled={detailJob.status === 1 ? false : true}
            />
          </div>
          {detailJob.status === 1 ? <Button

            onClick={handleClickUpdate}
            className='button-change'
          >CHANGE</Button> : ''}
          <p className='description-change'>{detailJob.description}</p>
          <div className="info">
            <div className="col-md-4">
              <div className="flex">
                <UserOutlined />
                <div className="name">
                  <p>Name</p>
                  <p>{infoFreelancer.name}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="flex">
                <MailOutlined />
                <div className="name">
                  <p>Email</p>
                  <p>{detailInfo.email}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="flex">
                <FieldTimeOutlined />
                <div className="name">
                  <p>Time line</p>
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
                {detailJob.status === 1 ? 'Freelancer is pending job.' :
                  detailJob.status === 2 ? 'Freelancer is doing job.' :
                    detailJob.status === 4 ?
                      <Space wrap className='space-check'>
                        <p>{detailJob?.result}</p>
                        <Button type="primary" icon={<DownloadOutlined />}>
                          Download
                        </Button>
                      </Space> :
                      detailJob.status === 3 ?
                        <div  >
                          <Space className='button-download'>
                            <p>{detailJob?.result}</p>
                            <Button type="primary" icon={<DownloadOutlined />}>
                              Download
                            </Button>
                          </Space>
                          <div>
                            <div>
                              <Button
                                className='button-update button-done'
                                type="text"
                                onClick={showModal}
                              >
                                DONE
                              </Button>
                              <Modal title="Feedback for this job"
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                  <Button key="submit" type="primary" onClick={handleOk}>
                                    Submit
                                  </Button>,
                                ]}
                              >
                                <Rate allowHalf onChange={handleRate} />
                                <TextArea rows={4} onChange={handleFeedback} />
                              </Modal>
                            </div>
                            <div>
                              <Button
                                className='button-update'
                                type="primary"
                                onClick={handleReject}
                                >
                                REJECT
                              </Button>
                            </div>
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

export default DetailJob