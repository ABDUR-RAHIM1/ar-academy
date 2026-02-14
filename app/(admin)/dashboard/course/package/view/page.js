 
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2 } from 'lucide-react'
import NoData from '@/utils/NoData'
import { getAllPackages } from '@/app/apiActions/packages'

// Admin Panel - Package View
export default async function PackageView() {
    const { status, data: packages } = await getAllPackages()
   

    if (status !== 200 || !packages) {
        return <NoData text={"Packges Not found"} />
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm border">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">All Packages</h2>
                        <p className="text-sm text-gray-500">Manage and view all subscription packages</p>
                    </div>
                    <Button variant="default">Add New Package</Button>
                </div>

                {/* Data Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableCaption>A list of your recently created packages.</TableCaption>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="w-[200px] font-bold">Package Name</TableHead>
                                <TableHead className="font-bold">Duration</TableHead>
                                <TableHead className="font-bold">Description</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="text-right font-bold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packages && packages.length > 0 ? (
                                packages.map((pkg) => (
                                    <TableRow key={pkg._id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium text-blue-600">{pkg.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="font-normal">
                                                {pkg.duration}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate text-gray-600">
                                            {pkg.description || "No description provided"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                                                Active
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                        No packages found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}