import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public page
import Landing from './pages/Landing';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// Onboarding pages
import LearningStyle from './pages/onboarding/LearningStyle';
import SkillLevel from './pages/onboarding/SkillLevel';
import LearningGoals from './pages/onboarding/LearningGoals';
import ReadyToStart from './pages/onboarding/ReadyToStart';

// Core user pages
import Home from './pages/Home';
import UserProgress from './pages/UserProgress';
import Leaderboard from './pages/Leaderboard';
import Streaks from './pages/Streaks';
import Achievements from './pages/Achievements';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Learning flow pages
import TopicsOverview from './pages/learning/TopicsOverview';
import TopicDetails from './pages/learning/TopicDetails';
import TopicQuiz from './pages/learning/TopicQuiz';
import QuizSummary from './pages/learning/QuizSummary';
import PuzzleJourney from './pages/learning/PuzzleJourney';
import PuzzleDetail from './pages/learning/PuzzleDetail';
import Completion from './pages/learning/Completion'; // (If you want a final Completion page after puzzles)

// AI feature pages
import AiMentor from './pages/AiMentor';
import CodeExplainer from './pages/CodeExplainer';
import CodeGenerator from './pages/CodeGenerator';
import DebugAssistant from './pages/DebugAssistant';
import HintEngine from './pages/HintEngine';

// Layout & utils
import ProtectedRoute from './components/ProtectedRoute';
import SidebarLayout from './components/SidebarLayout';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding/style" element={<LearningStyle />} />
        <Route path="/onboarding/level" element={<SkillLevel />} />
        <Route path="/onboarding/goals" element={<LearningGoals />} />
        <Route path="/onboarding/ready" element={<ReadyToStart />} />

        {/* Protected Routes wrapped with Sidebar Layout */}
        <Route
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          {/* Core Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Learning Flow */}
          <Route path="/learn" element={<TopicsOverview />} />
          <Route path="/learn/:topicId" element={<TopicDetails />} />
          <Route path="/learn/puzzle-journey/:topicId" element={<PuzzleJourney />} />
          <Route path="/learn/completion" element={<Completion />} />
          <Route path="/learn/:topicId/quiz" element={<TopicQuiz />} />
          <Route path="/learn/:topicId/quiz/summary" element={<QuizSummary />} />

          {/* Progress & Gamification */}
          <Route path="/progress" element={<UserProgress />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/streaks" element={<Streaks />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/rewards" element={<Rewards />} />

          {/* AI Tools */}
          <Route path="/ai/mentor" element={<AiMentor />} />
          <Route path="/ai/explainer" element={<CodeExplainer />} />
          <Route path="/ai/generator" element={<CodeGenerator />} />
          <Route path="/ai/debug" element={<DebugAssistant />} />
          <Route path="/ai/hint" element={<HintEngine />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<div className="p-8 text-center text-2xl font-semibold">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
