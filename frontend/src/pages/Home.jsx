import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Flame, Trophy, BarChart2, BookOpen, Sparkles, Bug, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Continue Learning",
    description: "Pick up where you left off and keep mastering DSA topics.",
    icon: <BookOpen size={24} className="text-indigo-600" />,
    link: "/learn",
  },
  {
    title: "Your Progress",
    description: "Track your journey and performance over time.",
    icon: <BarChart2 size={24} className="text-green-600" />,
    link: "/progress",
  },
  {
    title: "Achievements",
    description: "View badges and milestones you've earned.",
    icon: <Trophy size={24} className="text-yellow-500" />,
    link: "/achievements",
  },
  {
    title: "Streaks",
    description: "Maintain your daily streaks to stay consistent.",
    icon: <Flame size={24} className="text-red-500" />,
    link: "/streaks",
  },
];

const aiTools = [
  {
    title: "AI Mentor",
    icon: <Bot size={20} />,
    link: "/ai/mentor",
  },
  {
    title: "Code Debugger",
    icon: <Bug size={20} />,
    link: "/ai/debug",
  },
  {
    title: "Hint Engine",
    icon: <Sparkles size={20} />,
    link: "/ai/hint",
  },
];

const Home = () => {
  return (
    <div className="space-y-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome Back 👋
      </motion.h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-indigo-50">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-500">Total XP</h2>
            <p className="text-xl font-bold text-indigo-600">2,350 XP</p>
            <p className="text-sm text-gray-600">Level 5</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-500">Current Streak</h2>
            <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
              <Flame size={20} /> 7 Days
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <h2 className="text-sm text-gray-500">Last Activity</h2>
            <p className="text-md font-medium text-green-700">Completed “Binary Search” quiz</p>
            <p className="text-xs text-gray-500">Today at 4:12 PM</p>
          </CardContent>
        </Card>
      </div>

      {/* Main navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={section.link}>
              <Card className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="flex gap-4 items-start p-5">
                  {section.icon}
                  <div>
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick AI tools */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Quick AI Tools</h2>
        <div className="flex gap-4 flex-wrap">
          {aiTools.map((tool) => (
            <Link to={tool.link} key={tool.title}>
              <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-200 transition">
                {tool.icon} {tool.title}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
