import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bug, SendHorizonal } from "lucide-react";

const DebugAssistant = () => {
  const [code, setCode] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const handleDebug = () => {
    if (!code.trim()) return;
    setDebugInfo("Here’s a possible explanation for the bug or suggestion to fix it. (Replace with real AI output)");
    setCode("");
  };

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bug size={24} /> Debug Assistant
      </h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code with the bug here..."
        className="w-full h-40 p-3 border rounded-xl font-mono mb-4"
      />
      <button
        onClick={handleDebug}
        className="self-start flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
      >
        <SendHorizonal size={18} />
        Debug
      </button>

      {debugInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gray-100 p-4 rounded-xl text-sm leading-relaxed"
        >
          {debugInfo}
        </motion.div>
      )}
    </div>
  );
};

export default DebugAssistant;
