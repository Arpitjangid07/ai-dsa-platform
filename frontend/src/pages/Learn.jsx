import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const topics = [
  { id: "arrays", name: "Arrays", description: "Solve problems using arrays." },
  { id: "linked-lists", name: "Linked Lists", description: "Master linked list operations." },
  { id: "trees", name: "Trees", description: "Explore tree-based problems." },
  { id: "graphs", name: "Graphs", description: "Work with nodes and edges." },
];

export default function Learn() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen size={28} /> Choose a Topic to Learn
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/learn/${topic.id}`}
            className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition border border-slate-200 hover:border-indigo-500"
          >
            <h2 className="text-xl font-semibold mb-2">{topic.name}</h2>
            <p className="text-slate-600">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
