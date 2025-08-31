import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import { MdDashboard, MdOutlineViewList, MdOutlineAnalytics } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserGroup, FaBarsStaggered, FaXmark, FaLink, FaMessage } from "react-icons/fa6";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navigationItems = [
    {
        to: "/ADMIN-DASHBOARD",
        icon: MdDashboard,
        label: "Dashboard",
        isExact: true
    },
    // {
    //     to: "viewcourses",
    //     icon: MdOutlineViewList,
    //     label: "Courses"
    // },
    // {
    //     to: "allStudents",
    //     icon: FaUsers,
    //     label: "Students"
    // },
    // {
    //     to: "contacts",
    //     icon: FaUserGroup,
    //     label: "Contacts"
    // },
    // {
    //     to: "contractors",
    //     icon: MdOutlineAnalytics,
    //     label: "Contractors"
    // },
    {
        to: "send-links",
        icon: FaLink,
        label: "Send Links"
    },
    {
        to: "send-messages",
        icon: FaMessage,
        label: "Messages"
    }
];

const AdminLayout = () => {
    const { token } = useStateContext();
    const location = useLocation()
    const [sheetOpen, setSheetOpen] = useState(false);

    // if (!token) {
    //     return <Navigate to="/" />
    // }

    const NavigationList = ({ mobile = false, onItemClick }) => (
        <nav className={`${mobile ? 'flex flex-col space-y-2 p-4' : 'flex flex-col gap-1 md:gap-2'} jost`}>
            {navigationItems.map((item) => {
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onItemClick}
                        className={({ isActive: linkActive }) => {
                            const active = item.isExact
                                ? linkActive && location.pathname === item.to
                                : linkActive;
                            return active
                                ? `${mobile ? 'bg-blue-500 text-white' : 'bg-blue-500 text-black lg:text-white'} rounded-md flex gap-2 items-center px-3 py-2 transition-colors`
                                : `${mobile ? 'text-gray-700 hover:bg-blue-500/10' : 'text-black hover:bg-blue-500/10'} flex gap-2 items-center px-3 py-2 transition-colors`
                        }}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-screen">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1 bg-white lg:flex justify-center">
                <div className="w-full px-4">
                    <h1 className="font-black text-sm md:text-3xl py-7 jost">Dashboard</h1>
                    <NavigationList />
                </div>
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-4 md:p-0 p-2">
                {/* Header */}
                <div className="md:p-5 p-2 flex items-center gap-3 md:gap-10 lg:gap-32">
                    {/* Mobile Menu Sheet */}
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <FaBarsStaggered size={20} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white border-r">
                            <SheetHeader>
                                <SheetTitle className="text-left text-blue-500 font-bold">
                                    Admin Dashboard
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 border-t pt-4">
                                
                                <div className="flex flex-col gap-4 jost">
                                    
                                    {navigationItems.map((item) => {
                                        return (
                                            <NavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => setSheetOpen(false)}
                                                className={({ isActive: linkActive }) => {
                                                    const active = item.isExact
                                                        ? linkActive && location.pathname === item.to
                                                        : linkActive;
                                                    return active
                                                        ? `bg-blue-500 text-white rounded-md flex gap-2 items-center px-3 py-2 transition-colors`
                                                        : `text-gray-700 hover:bg-blue-500/10 rounded-md flex gap-2 items-center px-3 py-2 transition-colors`
                                                }}
                                            >{item.label}</NavLink>
                                        )
                                    })}
                                </div>

                            </div>
                        </SheetContent>
                    </Sheet>

                    <h1 className="font-black text-sm md:text-3xl jost">Dashboard</h1>

                    {/* Search Box */}
                    <div className="relative flex-1">
                        <Input type="text" className="pl-10 pr-10" placeholder="Search here" />
                        <FaSearch size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <FaMicrophone size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden lg:block text-right">
                            <p className="text-xs md:text-base font-medium">Vera Bassey</p>
                            <p className="text-[10px] font-semibold text-muted-foreground">Admin</p>
                        </div>
                        <div className="cursor-pointer bg-blue-500 text-white w-8 md:w-12 aspect-square rounded-full flex items-center justify-center font-bold">
                            VB
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout