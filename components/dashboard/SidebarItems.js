import { MdSpaceDashboard, MdLibraryBooks, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { BsViewList } from "react-icons/bs";

const sidebarItems = [
    {
        item: "Dashboard",
        icon: <MdSpaceDashboard />,
        children: []
    },
    {
        item: "Categories",
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
        item: "Sub-Categorie",
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
        item: "Questions",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "all Questions",
                path: "questions/view",
                icon: <BsViewList />
            },
            {
                item: "Add Questions",
                path: "questions/add",
                icon: <BsViewList />
            },

        ]
    },
    {
        item: "Users",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "User Managment",
                path: "users/view",
                icon: <BsViewList />
            },
            {
                item: "Results",
                path: "users/results",
                icon: <BsViewList />
            },
        ],

    },
    {
        item: "Team",
        icon: <MdLibraryBooks />,
        children: [
            {
                item: "Team Managment",
                path: "team/view",
                icon: <BsViewList />
            },
            {
                item: "Add new",
                path: "team/add",
                icon: <BsViewList />
            },
        ],

    },
    {
        item: "Settings",
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
            {
                item: "How to work",
                path: "settings/how-to-work",
                icon: <MdLibraryBooks />
            },
            {
                item: "Extract File",
                path: "settings/extract-file",
                icon: <MdLibraryBooks />
            },
        ]
    }
];

export default sidebarItems;
