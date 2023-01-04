import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd';
import { Card, Col, Row } from 'antd';

import API from '../../config/FetchAPI';
import banner1 from './banner.webp';
import './home.css';
function Home() {
  const [info, setInfo] = useState([]);

  const fetchAPI = async () => {
    const resUser = await API.requestGetAPI('api/users/information');
    localStorage.setItem("data", JSON.stringify(resUser));
    setInfo(resUser);
  }
  const handleClick = () => {
    window.location.href = '/freelancer';
  }
  useEffect(() => {
    fetchAPI();
  }, [])
  return (
    <div className="container-home">
      <div className="row">
        <div className="col-md-7">
          <h1 className='title-banner text-yellow-9 '>Join the world's work marketplace</h1>
          <p className='text-banner'>Find great talent. Build your business.Take your career to the next level.</p>
          <div className='search'>
            <Input placeholder="Basic usage" />
            <Button onClick={handleClick}>FIND</Button>
          </div>
        </div>
        <div className="col-md-5 flex img-banner">
          <img src={banner1} alt="" />
        </div>
      </div>
      <div className="section-home">
        <div className="background-banner">
          <div className="content-section-top">
          <h3 className='content-section'>Find talent your way</h3>
          <p className='content-p'>Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.</p>
          </div>
          <div className="card-content">
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home