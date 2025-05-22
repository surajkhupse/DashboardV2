import React, { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Navbar from '../components/layout/Navbar'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <><Navbar onSearchChange={setSearchQuery} /><DashboardLayout searchQuery={searchQuery}/></>
  )
}

export default Dashboard