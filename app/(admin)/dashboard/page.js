import React from 'react'  
import SummaryState from '@/components/dashboard/dashboardHome/SummaryState'
import UsersSummary from '@/components/dashboard/dashboardHome/UsersSummary' 

export default function DashboardHomePage() {


  return (
    <div className="p-4 md:p-8">
      {/* Profile Informartion of admin */}
      {/* <AdminProfile /> */} 
      <SummaryState />
      <UsersSummary />

      {/* Recent Activities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>New user registered: <strong>Abdur Rahim</strong></li>
          <li>Job posted: <strong>BCS</strong></li>
          <li>Course updated: <strong>45th BCS MCQ</strong></li>
        </ul>
      </div>

      {/* Future Section Placeholder */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Manage Courses</h3>
            <p className="text-sm text-gray-600">View, add or edit courses offered by Onushilon Academy.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Add New Job</h3>
            <p className="text-sm text-gray-600">Post job opportunities for learners and visitors.</p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
