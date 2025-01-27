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
        item: "Categories",
        path: "",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "All Categories",
                path: "categories/view",
                icon: <BsViewList />
            },
            {
                item: "Add Categories",
                path: "categories/add",
                icon: <MdLibraryBooks />
            },
        ]
    },
    {
        item: "Sub Categories",
        path: "",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "Sub Categories",
                path: "sub-categorie/view",
                icon: <BsViewList />
            },
            {
                item: "Add Sub Categorie",
                path: "sub-categorie/add",
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
                path: "chapters/view",
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
