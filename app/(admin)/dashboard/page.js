import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import AdminProfile from '@/components/dashboard/dashboardHome/AdminProfile'

export default function DashboardHomePage() {
  const adminInfo = {
    name: "Mr. Admin",
    email: "admin@onushilon.com",
    role: "Super Admin"
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <AdminProfile />

      {/* Admin Info Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p><strong>Email:</strong> {adminInfo.email}</p>
          <p><strong>Role:</strong> {adminInfo.role}</p>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-700">18</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Enrolled Students</h2>
            <p className="text-3xl font-bold text-green-700">520</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Jobs Posted</h2>
            <p className="text-3xl font-bold text-purple-700">7</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>New user registered: <strong>Rafiul Islam</strong></li>
          <li>Job posted: <strong>Junior Web Developer</strong></li>
          <li>Course updated: <strong>Full Stack Web Development</strong></li>
        </ul>
      </div>

      {/* Future Section Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  )
}
