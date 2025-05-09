import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Trophy,
  Flame,
  BarChart2,
  User,
  BrainCircuit,
  LogOut,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const mainNav = [
  { to: "/home", icon: <Home size={20} />, label: "Home" },
  { to: "/learn", icon: <BookOpen size={20} />, label: "Learn" },
  { to: "/achievements", icon: <Trophy size={20} />, label: "Achievements" },
  { to: "/streaks", icon: <Flame size={20} />, label: "Streaks" },
  { to: "/leaderboard", icon: <BarChart2 size={20} />, label: "Leaderboard" },
  { to: "/progress", icon: <User size={20} />, label: "Progress" },
];

const aiNav = [
  { to: "/ai/mentor", icon: <BrainCircuit size={20} />, label: "AI Mentor" },
];

export default function SidebarLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col py-6 px-4">
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            CodeQuest 🚀
          </h2>
          <ThemeToggle />
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 text-center mb-6">
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{user.name}</p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400">{user.email}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col space-y-1 flex-1">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold pl-2 mb-1 uppercase">
            Main
          </p>
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold pl-2 mt-5 mb-1 uppercase">
            AI Tools
          </p>
          {aiNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto dark:bg-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
