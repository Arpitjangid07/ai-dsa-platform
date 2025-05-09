import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExperienceLevel() {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  const options = [
    { label: 'Beginner', value: 'beginner', description: 'I’m just starting out.' },
    { label: 'Intermediate', value: 'intermediate', description: 'I know the basics.' },
    { label: 'Advanced', value: 'advanced', description: 'I’ve done competitive coding.' },
  ];

  const handleNext = () => {
    if (selected) {
      // Save selection to context or backend later
      navigate('/onboarding/goals');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-6">
      <h2 className="text-3xl font-bold mb-6">What’s your coding experience?</h2>

      <div className="grid gap-4 w-full max-w-md">
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition ${
              selected === opt.value ? 'border-blue-500 bg-slate-800' : 'border-slate-700'
            }`}
          >
            <h3 className="text-xl font-semibold">{opt.label}</h3>
            <p className="text-sm text-slate-300">{opt.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className={`mt-8 px-6 py-3 rounded-lg font-semibold ${
          selected ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
}
