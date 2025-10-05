import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., How does microgravity affect mouse liver genes?"
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-nasa-light"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 top-2 bg-nasa-blue text-white px-6 py-2 rounded-full hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}