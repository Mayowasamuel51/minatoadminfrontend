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

    console.log(data)
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
                <h3 className="text-lg font-semibold text-foreground mb-2">No Data Found</h3>
                {/* <p className="text-muted-foreground">There are no registered students at the moment.</p> */}
            </div>
        );
    }

    return (
        <div className="">
            <table className='dashboard table-auto w-full'>
                <thead className=''>
                    <tr className='font-black text-left'>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2'>Registration Date</th>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2'>Full Name</th>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2 k'>Email Address</th>
                            <th className='text-sm md:text-base tracking-wide p-1 md:p-2 k'>Age</th>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2 k'>Content</th>
                        {/* <th className='text-sm md:text-base tracking-wide p-1 md:p-2'>Provider</th> */}
                    </tr>
                </thead>
              <tbody className='tbody'>
  {paginatedData?.map((info) => (
    <tr key={info.id}>
      <td data-cell="Registration Date" className='text-[13px] leading-7 md:text-sm font-medium p-1 md:p-2'>
        {moment(info.created_at).format("YYYY-MM-DD")}
      </td>
      <td data-cell="fullname" className='text-[13px] leading-7 md:text-sm font-medium p-1 md:p-2'>
        {info.fullname}
      </td>
      <td data-cell="Email Address" className='text-[13px] leading-7 md:text-sm font-medium p-1 hidden md:block md:p-2'>
        {info.email}
      </td>
      <td data-cell="Age" className='text-[13px] leading-7 md:text-sm font-medium p-1 md:p-2'>
        {info.age}
      </td>
      <td data-cell="Description" className='text-[13px] leading-7 md:text-sm font-medium p-1 md:p-2'>
        {info.description}
      </td>
    </tr>
  ))}
</tbody>

            </table>
            <div>
                {!data && <h3 className="font-bold text-center md:text-3xl">No Data Available.</h3>}
            </div>
        </div>
    )
}

export default StudentTable

