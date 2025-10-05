import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, ExternalLink, FlaskConical, Microscope, Rocket } from 'lucide-react';

// Types
interface Study {
  id: string;
  title: string;
  organism: string;
  mission: string;
  assay_type: string;
  principal_investigator: string;
  osdr_url: string;
}

interface ApiResponse {
  query: string;
  ai_summary: string;
  statistics: {
    total_studies: number;
    top_organism: string;
    missions: string[];
    assays: string[];
  };
  study_cards: Study[];
}

// SearchBar Component
function SearchBar({ onSearch, loading }: { onSearch: (query: string) => void; loading: boolean }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., How does microgravity affect mouse bone density?"
          disabled={loading}
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={() => setQuery('Arabidopsis space radiation')}
          className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          Arabidopsis radiation
        </button>
        <button
          type="button"
          onClick={() => setQuery('mouse microgravity ISS')}
          className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          Mouse microgravity
        </button>
        <button
          type="button"
          onClick={() => setQuery('tissue samples spaceflight')}
          className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          Tissue samples
        </button>
      </div>
    </form>
  );
}

// StudyCard Component
function StudyCard({ study }: { study: Study }) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all hover:border-blue-300">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FlaskConical className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{study.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Study ID: {study.id}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-2">
          <Microscope className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-500">Organism:</span>
            <p className="font-medium text-gray-900">{study.organism}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-500">Mission:</span>
            <p className="font-medium text-gray-900">{study.mission}</p>
          </div>
        </div>
        <div>
          <span className="text-gray-500">Assay Type:</span>
          <p className="font-medium text-gray-900">{study.assay_type}</p>
        </div>
        <div>
          <span className="text-gray-500">PI:</span>
          <p className="font-medium text-gray-900">{study.principal_investigator}</p>
        </div>
      </div>
      
      <a
        href={study.osdr_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
      >
        View on NASA OSDR
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

// AiInsightsPanel Component
function AiInsightsPanel({ summary, stats }: { summary: string; stats: ApiResponse['statistics'] }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-600 rounded-lg">
          <FlaskConical className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">AI Overview</h2>
      </div>
      
      <p className="text-gray-700 mb-5 leading-relaxed">{summary}</p>
      
      <div className="border-t-2 border-blue-200 pt-5">
        <h3 className="font-semibold text-gray-900 mb-3">Key Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Studies</span>
            <span className="font-bold text-blue-600 text-lg">{stats.total_studies}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Top Organism</span>
            <span className="font-medium text-gray-900">{stats.top_organism}</span>
          </div>
          <div>
            <span className="text-gray-600 block mb-1">Missions</span>
            <div className="flex flex-wrap gap-1.5">
              {stats.missions.map((mission, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {mission}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-600 block mb-1">Assay Types</span>
            <div className="flex flex-wrap gap-1.5">
              {stats.assays.map((assay, i) => (
                <span key={i} className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                  {assay}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://genesis-backend-1-1.onrender.com/api/search', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FlaskConical className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Genesis
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            AI-powered search for NASA space biology data
          </p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Study Cards (Left 2/3) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Studies Found ({results.statistics.total_studies})
              </h2>
              {results.study_cards.length > 0 ? (
                <div className="space-y-4">
                  {results.study_cards.map(study => (
                    <StudyCard key={study.id} study={study} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No studies found. Try a different query.
                </div>
              )}
            </div>

            {/* AI Insights (Right 1/3) */}
            <div>
              <AiInsightsPanel
                summary={results.ai_summary}
                stats={results.statistics}
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && !error && (
          <div className="text-center mt-16">
            <FlaskConical className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Enter a query to explore NASA's biological space data
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try searching for organisms, missions, or specific experiments
            </p>
          </div>
        )}
      </div>
    </div>
  );
}