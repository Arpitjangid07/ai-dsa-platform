import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Sparkles, Lightbulb, Brain } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">CodeQuest 🚀</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800 dark:text-gray-100">
            Master DSA with AI-powered learning & gamification
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            CodeQuest helps you learn Data Structures and Algorithms through personalized quizzes, AI guidance, and streak-based motivation — all designed to make you a DSA pro!
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </div>

        <div className="mt-12 md:mt-0 md:ml-12">
          
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16 px-8">
        <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center">
          <FeatureCard icon={<Sparkles size={32} />} title="Personalized Learning" text="Adaptive DSA roadmap based on your goals and skill level." />
          <FeatureCard icon={<Lightbulb size={32} />} title="AI Hint Engine" text="Get smart hints when you're stuck on problems." />
          <FeatureCard icon={<Brain size={32} />} title="AI Mentor" text="Chat with your AI mentor to understand concepts deeply." />
          <FeatureCard icon={<Rocket size={32} />} title="Gamified Progress" text="Earn XP, unlock achievements, and track your streaks." />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm bg-indigo-50 dark:bg-gray-900">
        &copy; {new Date().getFullYear()} CodeQuest. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
    </div>
  );
}
