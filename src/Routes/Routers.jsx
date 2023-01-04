import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DetailJobFree from '../Component/ControlFreelancer/DetailJob/DetailJobFreelancer'
import DetailJob from '../Component/DetailJob/DetailJob'
import Freelancer from '../Component/Freelance/Freelancer'
import Home from '../Component/Home/Home'
import JobFreelancer from '../Component/JobFreelancer/JobFreelancer'
import Jobs from '../Component/Jobs/Jobs'
import Register from '../Component/Register/Register'

export const RouterLoggin = () =>{
  <Routes>
      <Route path='/register' element={<Register />}/>
  </Routes>
}
function Routers() {
  return (
    <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/freelancer' element={<Freelancer />}/>
        <Route path='/jobs' element={<Jobs />}/>
        <Route path='/job-freelancer' element={<JobFreelancer />}/>
        <Route path='/job/*' element={<DetailJob />}/>
        <Route path='/joF/*' element={<DetailJobFree />} />
    </Routes>
    
  )
}

export default Routers;