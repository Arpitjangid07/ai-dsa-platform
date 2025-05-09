import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Send } from "lucide-react";

const HintEngine = () => {
  const [question, setQuestion] = useState("");
  const [hint, setHint] = useState("");

  const handleGetHint = () => {
    if (!question.trim()) return;
    setHint(`💡 Hint for: "${question}"\n\nThink about edge cases and consider using a stack for better performance.`);
    setQuestion("");
  };

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Lightbulb size={24} /> AI Hint Engine
      </h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your DSA question or stuck logic..."
        rows={4}
        className="w-full p-3 border rounded-xl mb-4"
      />
      <button
        onClick={handleGetHint}
        className="self-start flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
      >
        <Send size={18} />
        Get Hint
      </button>

      {hint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-yellow-100 text-yellow-800 p-4 rounded-xl"
        >
          {hint}
        </motion.div>
      )}
    </div>
  );
};

export default HintEngine;

