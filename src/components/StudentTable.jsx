import Loader from "./Loader"
import { useState } from 'react';
import FetchAllStudents from '../hooks/FetchAllStudents';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ServerErrorPage from "./ServerErrorPage";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa"
import '@splidejs/react-splide/css';
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Calendar, Mail, User, Shield } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const StudentTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const { data, isLoading, error } = FetchAllStudents()

    const getProviderColor = (provider) => {
        switch (provider.toLowerCase()) {
            case 'google':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'facebook':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'github':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };


    if (error) return <p className='text-center text-red-500 md:text-3xl font-black'>{error.message}</p>
    if (isLoading) return <Loader />
    if (data?.status === 500) return <ServerErrorPage />

    const length = data?.data?.response?.length || 1

    const students = data?.data?.response || [];
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const paginatedData = students.slice(firstPostIndex, lastPostIndex);
    const totalPages = Math.ceil(students.length / postsPerPage);

    const pageNumber = []
    for (let i = 1; i <= Math.ceil((length) / postsPerPage); i++) {
        pageNumber.push(i)
    }

    if (!data) {
        return (
            <div className="text-center py-12">
                <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Students Found</h3>
                <p className="text-muted-foreground">There are no registered students at the moment.</p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="space-y-6 max-w-5xl">
                <div className="rounded-lg border border-border overflow-hidden">
                    <Table className="dashboard-table">
                        <TableHeader>
                            <TableRow className="hover:bg-muted/50">
                                <TableHead className="w-[100px]">Student</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Registration
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Provider
                                    </div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((student, index) => (
                                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <Avatar className="w-10 h-10">
                                            <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                                                {getInitials(student.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium text-foreground">
                                                {student.name}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Mail className="w-3 h-3" />
                                                {student.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="text-sm text-muted-foreground jost">
                                            {moment(student.date)
                                                .utc()
                                                .format("YYYY-MM-DD")}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`font-medium ${getProviderColor(student.provider)}`}
                                        >
                                            {student.provider}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {firstPostIndex + 1} to {Math.min(lastPostIndex, students.length)} of {students.length} students
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className="w-9 h-9 p-0"
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1">
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {!data && <h3 className="font-bold text-center md:text-3xl">No Data Available.</h3>}
            </div>
        </div>
    )
}

export default StudentTable

