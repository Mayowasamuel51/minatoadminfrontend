import { FaUserCheck } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";
import StudentTable from "./StudentTable";
import FetchAllStudents from "../hooks/FetchAllStudents";
import { Users, BookOpen, TrendingUp, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationsTable from "./StudentTable";

const AdminDashboard = () => {
    const { data } = FetchAllStudents()

    const stats = [
        {
            title: "Total Students",
            value: data?.data?.response.length || "0",
            description: "Registered students",
            icon: Users,
            gradient: "dashboard-gradient",
            trend: "+12% from last month"
        },
        {
            title: "Active Courses",
            value: "8",
            description: "Available courses",
            icon: BookOpen,
            gradient: "dashboard-accent-gradient",
            trend: "+2 new courses"
        },
    ]
    return (
        <section className="flex flex-col gap-6 py-6">
            <div className="">
                <div className="md:p-5 p-2">
                    <div className="flex flex-wrap md:justify-start items-center gap-2">
                        <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-grayBG rounded-md">
                            <div className="">
                                <FaUserCheck size={30} />
                            </div>
                            <div className="text-center">
                                {/* <p className="text-xs md:text-base">Total User</p> */}
                                {/* <p className="font-bold">{data?.data?.response.length || "00"}</p> */}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-5 md:p-3 p-1 bg-grayBG rounded-md">
                            <div className="">
                                {/* <BsTruck size={30} /> */}
                            </div>
                            {/* <div className="text-center">
                                <p className="text-xs md:text-base">Total Course</p>
                                <p className="font-bold">8</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5 md:my-0 px-2 md:px-5 md:flex items-start md:gap-6">
                <div className="flex-1 md:p-5 md:min-h-[275px] bg-grayBG rounded-md mb-5 md:mb-0">
                    <h1 className="font-bold text-base md:text-xl md:mb-5 p-2">Registered Applicant from the site </h1>
                    {/* <StudentTable /> */}
                    <ApplicationsTable/>
                </div>
            </div>
        </section>

    )
}

export default AdminDashboard