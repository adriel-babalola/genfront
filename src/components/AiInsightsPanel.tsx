import React from 'react';

interface Stats {
  total_studies: number;
  top_organism: string;
  missions: string[];
  assays: string[];
}

interface Props {
  summary: string;
  stats: Stats;
}

export default function AiInsightsPanel({ summary, stats }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit sticky top-8">
      <h2 className="text-xl font-bold text-nasa-blue mb-3">AI Overview</h2>
      <p className="text-gray-700 mb-4">{summary}</p>
      
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Key Statistics</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Total studies: <span className="font-medium">{stats.total_studies}</span></li>
          <li>• Top organism: <span className="font-medium">{stats.top_organism}</span></li>
          <li>• Missions: <span className="font-medium">{stats.missions.join(', ')}</span></li>
          <li>• Assays: <span className="font-medium">{stats.assays.join(', ')}</span></li>
        </ul>
      </div>
    </div>
  );
}