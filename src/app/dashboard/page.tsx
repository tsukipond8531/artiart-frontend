'use client'
import DashboardProvider from 'components/layout/DashbaordProvider'
import React from 'react'
import ProtectedRoute from 'hooks/AuthHookAdmin'
const Dashboard = () => {
  return (
    <DashboardProvider>
      Dashboard Home
    </DashboardProvider>
  )
}

export default ProtectedRoute(Dashboard)

