import { MdSpaceDashboard, MdLibraryBooks, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { BsViewList } from "react-icons/bs";

const sidebarItems = [
    {
        item: "Dashboard",
        path: "dashboard",
        icon: <MdSpaceDashboard />,
        children: []
    },
    {
        item: "Subjects",
        path: "",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "All Subjects",
                path: "subjects/view",
                icon: <BsViewList />
            },
            {
                item: "Add Subject",
                path: "subjects/add",
                icon: <MdLibraryBooks />
            },
        ]
    },
    {
        item: "Chapters",
        path: "",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "All Chapters",
                path: "chapter-list",
                icon: <BsViewList />
            },
            {
                item: "Add Chapter",
                path: "chapters/add",
                icon: <MdLibraryBooks />
            },
        ]
    },
    {
        item: "Settings",
        path: "",
        icon: <MdSettings />,
        children: [
            {
                item: "Profile",
                path: "settings/profile",
                icon: <MdLibraryBooks />
            },
            {
                item: "Security",
                path: "settings/security",
                icon: <MdLibraryBooks />
            },
            {
                item: "Notifications",
                path: "settings/notifications",
                icon: <MdLibraryBooks />
            },
        ]
    },
    {
        item: "Logout",
        path: "logout",
        icon: <IoMdLogOut />,
        children: []
    }
];

export default sidebarItems;
