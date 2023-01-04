import React from 'react';
import { Layout } from 'antd';
import './App.css';
import Headers from './Component/Header/Headers';
import Freelancer from './Component/Freelance/Freelancer';
import Home from './Component/Home/Home';
import Routers from './Routes/Routers';
import DetailJob from './Component/DetailJob/DetailJob';
const { Header, Footer, Content } = Layout;
function App() {
  return (
    <Layout>
      <Header><Headers /></Header>
      <Content>
        <Routers />
      </Content>
      <Footer>
        © 2021 FFLance® Global Inc.
      </Footer>
    </Layout>
  )
}

export default App;
