import React, { useState, useEffect } from 'react';
import { Input, Drawer } from 'antd';
import API from '../../config/FetchAPI';
import './Freelancer.css';
import ShowDrawer from './Drawer/ShowDrawer';
const { Search } = Input;
function Freelancer() {
  const onSearch = (value) => console.log(value);
  const [freelancer, setFreelancer] = useState([]);
  const [freelancerCheck, setFreelancerCheck] = useState(null)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const showDrawer = async (record) => {
    setOpen(true);
    setFreelancerCheck({ ...record })
  };
  const onClose = () => {

    setOpen(false);
  }
  const fetchAPI = async () => {
    const resFreelancer = await API.requestGetAPI('v1/freelancers');
    setFreelancer(resFreelancer.data);
  }
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if(data){
      setData(data);
      fetchAPI();
    }
  }, []);

  return (
    <>
      <div className="content-freelancer">
        <div className="search-freelancer">
          <h3>See talent who match jobs like yours</h3>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            className='row onsearch'
          />
        </div>
        <div className="container-freelancer">
          <h5>Get proposals from talent like this</h5>
          <div className="row">
            {
              freelancer.map((item, index) => (
                <div key={index} className='col-md-6'   >
                  <div className="title-freelancer" style={{
                    display: data?.freelancerDTO?.id === item.id ? 'none' : ''
                  }}>
                    <div className="header-freelancer flex">
                      <img src={item.thumbnail} alt="" />
                      <div className="title-content">
                        <p className='freelancer-name' onClick={() => {
                          showDrawer(item)
                          localStorage.setItem('IDFreelancer', item.id)
                        }}>
                          {item.name}
                        </p>
                        <p>{item.title}</p>
                      </div>
                    </div>
                    <div className="footer-content flex">
                      <div className='info-income'>
                        <strong>{item.averageIncome} /hr</strong>
                        <div>Average rate</div>
                      </div>
                      <div className='info-income'>
                        <strong>${item.totalEarning}</strong>
                        <div>Average rate</div>
                      </div>
                      <div className='info-income'>
                        <strong>${item.totalJobDone}</strong>
                        <div>Total jobs</div>
                      </div>
                      <div className='info-income'>
                        <strong>${item.rate}</strong>
                        <div>Rate</div>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            }

          </div>

          <Drawer
            title='Freelancer information'
            width={1280}
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <ShowDrawer {...freelancerCheck} />
          </Drawer>
        </div>

      </div>

    </>
  )

}

export default Freelancer;