import React from 'react';

interface Study {
  id: string;
  title: string;
  organism: string;
  mission: string;
  assay_type: string;
  principal_investigator: string;
  osdr_url: string;
}

interface Props {
  study: Study;
}

export default function StudyCard({ study }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg text-gray-900 mb-2">{study.title}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        <div><span className="font-medium">Organism:</span> {study.organism}</div>
        <div><span className="font-medium">Mission:</span> {study.mission}</div>
        <div><span className="font-medium">Assay:</span> {study.assay_type}</div>
        <div><span className="font-medium">PI:</span> {study.principal_investigator}</div>
      </div>
      <a
        href={study.osdr_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-nasa-blue font-medium hover:underline"
      >
        View on NASA OSDR →
      </a>
    </div>
  );
}