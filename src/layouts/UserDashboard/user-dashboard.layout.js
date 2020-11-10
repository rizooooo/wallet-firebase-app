import React from 'react'
import { BottomNav, DashboardNavbar } from './components';


const UserDashboardLayout = ({ children }) => {
    return (
        <div>
            {/* <DashboardNavbar />
            <div style={{ marginTop: '52px' }}>
              
            </div> */}
            <div>
            {children}
            </div>
            
            <BottomNav />

        </div>
    )
}

export default UserDashboardLayout;