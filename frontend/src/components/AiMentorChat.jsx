import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Configure axios to use the backend URL
const API_BASE_URL = 'http://localhost:5000';

const AiMentorChat = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [availableModels, setAvailableModels] = useState({
    'gpt-3.5-turbo': 'GPT-3.5 Turbo',
    'gpt-4': 'GPT-4',
    'claude-2': 'Claude 2',
    'claude-instant': 'Claude Instant'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/ai/models`);
        if (response.data && response.data.models) {
          setAvailableModels(response.data.models);
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        // Keep the default models if the API call fails
      }
    };
    fetchModels();
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai/mentor`, {
        message,
        userId: 'current-user', // In production, use actual user ID
        model: selectedModel
      });

      setConversation(prev => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: response.data.reply }
      ]);
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/ai/clear-history`, {
        userId: 'current-user' // In production, use actual user ID
      });
      setConversation([]);
    } catch (err) {
      setError('Failed to clear conversation history');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">AI Mentor</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {Object.keys(availableModels).length > 0 ? (
              Object.entries(availableModels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))
            ) : (
              <option value="gpt-3.5-turbo">Loading models...</option>
            )}
          </select>
          <button
            onClick={clearHistory}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear History
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
            } max-w-[80%]`}
          >
            <p className="text-sm font-semibold mb-1">
              {msg.role === 'user' ? 'You' : 'AI Mentor'}
            </p>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AiMentorChat; 