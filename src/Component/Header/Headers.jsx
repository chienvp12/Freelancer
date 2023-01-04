import { Button, Dropdown } from 'antd';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserOutlined } from '@ant-design/icons';
import API from '../../config/FetchAPI';
const checkId = localStorage.getItem('IDAccount');
function Headers() {
    const [info, setInfo] = useState([]);
    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = '/login'
    }
    const items = [
        {
            label:
                <>
                    <strong>{info?.username}</strong>
                    <p>FREELANCER</p>
                </>
            ,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label:
                <>
                    <span>
                        <strong>Balance: </strong>
                        {info?.amount}$
                    </span>
                </>
            ,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label:
                <strong>Setting </strong>
            ,
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label:
                <strong onClick={handleLogOut}>Logout </strong>
            ,
            key: '3',
        },

    ]
    const fetchAPI = async () => {
        const resUser = await API.requestGetAPI('api/users/information');
        localStorage.setItem("data", JSON.stringify(resUser));
        setInfo(resUser);
      }

    useEffect(() => {
       fetchAPI()
    }, []);

    return (
        <div className="container-header">
            <div className="header-left q-tollbar" >
                <Link to='/home' onClick={() => window.location.href('/home')}>
                    <img className='q-avatar' src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt='' />
                    <p>FFLance</p>
                </Link>
            </div>
            <div className="header-right q-tollbar"
                style={{
                    display: checkId ? '' : 'none'
                }}
            >
                <Link to='/freelancer'>FIND TALENT</Link>
                <Link to='/jobs' >MY OWNER JOBS</Link>
                <Link to='/job-freelancer'>MY FREELANCER JOB</Link>
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <Button>
                        <UserOutlined />
                    </Button>
                </Dropdown>

            </div>
        </div>
    )
}

export default Headers;