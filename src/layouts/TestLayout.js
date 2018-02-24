import React from 'react'
import './TestLayout.css'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Dashboard from '../routes/Dashboard/containers/DashboardContainer'

const TestLayout = () => (
    <div>
        <Header />
        <Dashboard/>
        <Footer />
    </div>
)

export default TestLayout