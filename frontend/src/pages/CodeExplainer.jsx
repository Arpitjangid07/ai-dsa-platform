import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

const CodeExplainer = () => {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleExplain = () => {
    if (!code.trim()) return;
    setExplanation("This code performs a specific task based on the logic you've written. (Replace with real AI output)");
    setCode("");
  };

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Code Explainer</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-40 p-3 border rounded-xl font-mono mb-4"
      />
      <button
        onClick={handleExplain}
        className="self-start flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
      >
        <SendHorizonal size={18} />
        Explain
      </button>

      {explanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gray-100 p-4 rounded-xl text-sm leading-relaxed"
        >
          {explanation}
        </motion.div>
      )}
    </div>
  );
};

export default CodeExplainer;
