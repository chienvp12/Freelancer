import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Rate, Modal, Tabs, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import API from '../../../config/FetchAPI';
import CreateJob from '../CreateJob/CreateJob';
import './ShowDrawer.css';
function ShowDrawer(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [work, setWork] = useState([]);
  const fetchAPI = async () => {
    const resWork = await API.requestGetAPI(`job/list?freelancerId=${props?.id}`)
    setWork(resWork.data);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchAPI();
  }, [props?.id]);
  return (
    <div className="wrapper-container">
      <div className="container-header flex boder-line">
        <div className="header-freelancer flex">
          <img src={props?.thumbnail} alt="" />
          <div className="title-content">
            <p className='freelancer-name'>
              {props?.name}
            </p>
            <p>
              <EnvironmentOutlined />
              {props?.address}
            </p>
            <Rate value={props?.rate} disabled />
          </div>
        </div>
        <div className="button-connect">
          <Button onClick={showModal}>connect</Button>
          <Modal title="Create Job"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            >
            <CreateJob {...work}/>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="col-4-top">
            <div className="gender">
              <span>
                <strong>Gender: </strong>
                {props?.gender}
              </span>
            </div>
            <div className="experience">
              <span>
                <strong>Experience: </strong>
                {props?.experience}
              </span>
            </div>
            <div className="experience">
              <span>
                <strong>Average Income: </strong>
                {props?.averageIncome}
              </span>
            </div>
          </div>
          <div className="col-4-bottom">
            <div className="total-Earning">
              <strong>{props?.totalEarning}</strong>
              <p>Total Earnings</p>
            </div>
            <div className="total-Jobdone">
              <strong>{props?.totalJobDone}</strong>
              <p>Total Jobdone</p>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="col-8-top">
            <strong className='title-strong'>{props?.title}</strong>
            <p className='description-drawer' dangerouslySetInnerHTML={{ __html: props?.description }}></p>
          </div>
          <hr style={{ border: '0.5px solid #a7a7a7' }} />
          <div className="work-history">
            <div className="title-work">
              <strong>Work History</strong>
            </div>

            <Tabs
              defaultActiveKey='1'
              items={[
                {
                  label: `COMPLETED JOBS`,
                  key: '1',
                  children: (
                    <>
                      {
                        work.map((workItem, index) => {
                          if (workItem.status === 4) {
                            return (
                              <Card className="tab-content" key={index}>
                                <div className="completed-job" >
                                  <h6 className='text-h6'>{workItem.subject}</h6>
                                  <Rate value={workItem.rate} disabled />
                                  <p className="date-response">
                                    <strong>Response Date: </strong>
                                    {workItem.response_date.slice(0, 10)}
                                  </p>
                                  <p className="comment">
                                    {workItem.comment}
                                  </p>
                                  <p className="salary-response">
                                    <strong>Salary: </strong>
                                    {workItem.salary}$
                                  </p>
                                </div>
                              </Card>
                            )
                          }
                        })
                      }
                    </>
                  )
                },
                {
                  label: `IN PROGESS`,
                  key: '2',
                  children: (
                    <>
                      {
                        work.map((workItem, index) => {
                          if (workItem.status === 3) {
                            return (
                              <Card className="tab-content" key={index}>
                                <div className="completed-job" >
                                  <h6 className='text-h6'>{workItem.subject}</h6>
                                  <Rate value={workItem.rate} disabled />
                                  <p className="date-response">
                                    <strong>Response Date: </strong>
                                    {workItem.response_date.slice(0, 10)}
                                  </p>
                                  <p className="comment">
                                    {workItem.comment}
                                  </p>
                                  <p className="salary-response">
                                    <strong>Salary: </strong>
                                    {workItem.salary}$
                                  </p>
                                </div>
                              </Card>
                            )
                          }
                        })
                      }
                    </>
                  )
                },
              ]}
            >

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDrawer;