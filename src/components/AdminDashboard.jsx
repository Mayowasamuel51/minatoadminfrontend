import { FaUserCheck } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";
import StudentTable from "./StudentTable";
import FetchAllStudents from "../hooks/FetchAllStudents";
import { Users, BookOpen, TrendingUp, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} className="bg-white group hover:scale-105 transition-transform duration-200">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">
                                                {stat.title}
                                            </p>
                                            <p className="text-2xl font-bold text-foreground">
                                                {stat.value}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1 jost">
                                                {stat.description}
                                            </p>
                                        </div>
                                        <div className={`stat-icon ${stat.gradient}`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <p className="text-xs text-success font-medium">
                                            {stat.trend}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-base md:text-xl">Registered Students</h1>
                    <StudentTable />
                </div>
            </div>
        </section>

    )
}

export default AdminDashboard