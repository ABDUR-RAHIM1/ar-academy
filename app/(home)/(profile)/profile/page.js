import React from 'react';
import { FiEdit, FiBookOpen, FiFileText, FiBarChart2, FiClock } from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';

const ProfileDashboard = () => {
    const user = {
        name: "Rahim Uddin",
        email: "rahim@example.com",
        joined: "January 2024",
        lastLogin: "May 4, 2025",
        photo: "",
        coursesBought: 5,
        examsTaken: 12,
        avgResult: 84,
        recentCourses: [
            { title: "React Basics", progress: 75 },
            { title: "JavaScript Mastery", progress: 45 },
        ],
        achievements: ["React Beginner", "Top Scorer"],
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Profile Header */}
            <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src={user.photo || "https://i.pravatar.cc/100"}
                        alt="profile"
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-400">Member since: {user.joined}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <FiClock /> Last login: {user.lastLogin}
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <FiEdit /> Edit Profile
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
                    <FiBookOpen className="text-3xl text-blue-500" />
                    <div>
                        <p className="text-xl font-bold">{user.coursesBought}</p>
                        <p className="text-gray-600 text-sm">Courses Bought</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
                    <FiFileText className="text-3xl text-green-500" />
                    <div>
                        <p className="text-xl font-bold">{user.examsTaken}</p>
                        <p className="text-gray-600 text-sm">Exams Taken</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
                    <FiBarChart2 className="text-3xl text-purple-500" />
                    <div>
                        <p className="text-xl font-bold">{user.avgResult}%</p>
                        <p className="text-gray-600 text-sm">Average Result</p>
                    </div>
                </div>
            </div>

            {/* Recent Courses Progress */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Recent Courses</h3>
                {user.recentCourses.map((course, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-medium">{course.title}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">{course.progress}% completed</p>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="flex flex-wrap gap-3">
                    {user.achievements.map((badge, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                            <BsPatchCheckFill /> {badge}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
