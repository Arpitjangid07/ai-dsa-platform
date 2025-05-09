import React from 'react';
import AiMentorChat from '../components/AiMentorChat';

const AiMentor = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Coding Mentor</h1>
          <p className="text-gray-600 mb-8 text-center">
            Get personalized help with your coding questions. Choose from different AI models and maintain conversation history.
          </p>
          <AiMentorChat />
        </div>
      </div>
    </div>
  );
};

export default AiMentor;
