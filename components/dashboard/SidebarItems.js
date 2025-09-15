import { MdSpaceDashboard, MdLibraryBooks, MdSettings, MdOutlineQuiz } from "react-icons/md";
import { FaUsers, FaUserCog, FaUserShield } from "react-icons/fa";
import { BsViewList } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FiUserCheck } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const sidebarItems = [
    {
        item: "Dashboard",
        icon: <MdSpaceDashboard />,
        children: [
            {
                item: "Overview",
                path: "",
                icon: <BsViewList />
            },
        ]
    },
    {
        item: "Categories",
        icon: <GiBookshelf />,
        children: [
            {
                item: "All Categories",
                path: "categories/view",
                icon: <BsViewList />
            },
            {
                item: "Add Categories",
                path: "categories/add",
                icon: <GiBookshelf />
            },
        ]
    },
    {
        item: "Sub-Categorie",
        icon: <GiBookshelf />,
        children: [
            {
                item: "Sub Categories",
                path: "sub-categorie/view",
                icon: <BsViewList />
            },
            {
                item: "Add Sub Categorie",
                path: "sub-categorie/add",
                icon: <GiBookshelf />
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
        item: "Course",
        icon: <MdOutlineQuiz />,
        children: [
            {
                item: "add course",
                path: "course/add",
                icon: <BsViewList />
            },
            {
                item: "view course",
                path: "course/view",
                icon: <BsViewList />
            },
            {
                item: "all Questions",
                path: "course/questions/view",
                icon: <BsViewList />
            },
            {
                item: "Add Questions",
                path: "course/questions/add",
                icon: <MdOutlineQuiz />
            },

        ]
    },
    {
        item: "Questions Sheet",
        icon: <MdOutlineQuiz />,
        children: [
            {
                item: "Class List",
                path: "questions-sheet/classList",
                icon: <BsViewList />
            },
            {
                item: "Subject List",
                path: "questions-sheet/subjectList",
                icon: <BsViewList />
            },
            {
                item: "Chapter List",
                path: "questions-sheet/chapterList",
                icon: <BsViewList />
            },
            {
                item: "Add Questions Sheet",
                path: "questions-sheet/add",
                icon: <MdOutlineQuiz />
            },
            {
                item: "View Questions Sheet",
                path: "questions-sheet/view",
                icon: <MdOutlineQuiz />
            },

        ]
    },
    {
        item: "Users",
        icon: <FaUsers />,
        children: [
            {
                item: "User Managment",
                path: "users/view",
                icon: <FaUserCog />
            },
            {
                item: "Results",
                path: "users/results",
                icon: <HiOutlineDocumentReport />
            },
        ],
    },
    {
        item: "Team",
        icon: <RiTeamLine />,
        children: [
            {
                item: "Team Managment",
                path: "team/view",
                icon: <FaUserCog />
            },
            {
                item: "Add new",
                path: "team/add",
                icon: <FiUserCheck />
            },
        ],
    },
    {
        item: "Subscription",
        icon: <RiTeamLine />,
        children: [
            {
                item: "Add Subscription",
                path: "subscription/add",
                icon: <FiUserCheck />
            },
            {
                item: "View Subscription",
                path: "subscription/view",
                icon: <FaUserCog />
            },

            {
                item: "Sales History",
                path: "subscription/salesHistory",
                icon: <FiUserCheck />
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
                icon: <FaUserCog />
            },
            {
                item: "Security",
                path: "settings/security",
                icon: <FaUserShield />
            },
            {
                item: "Notifications",
                path: "settings/notifications",
                icon: <IoSettingsOutline />
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
