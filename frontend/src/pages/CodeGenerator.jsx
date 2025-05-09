import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGeneratedCode(`// This is a placeholder for generated code based on:\n// "${prompt}"\n\nfunction example() {\n  console.log("Hello, World!");\n}`);
    setPrompt("");
  };

  return (
    <div className="p-4 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Sparkles size={24} /> Code Generator
      </h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want the code to do..."
        className="w-full p-3 border rounded-xl mb-4"
      />
      <button
        onClick={handleGenerate}
        className="self-start flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
      >
        <Send size={18} />
        Generate
      </button>

      {generatedCode && (
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gray-900 text-green-400 p-4 rounded-xl overflow-auto text-sm"
        >
          {generatedCode}
        </motion.pre>
      )}
    </div>
  );
};

export default CodeGenerator;
