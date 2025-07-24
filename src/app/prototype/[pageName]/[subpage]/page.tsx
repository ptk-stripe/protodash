import React from 'react';

interface PrototypeSubpageProps {
  params: {
    pageName: string;
    subpage: string;
  };
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return [
    { pageName: "example-dashboard", subpage: "index" },
    // Add more prototypes here as they are created
  ];
}

export default function PrototypeSubpage({ params }: PrototypeSubpageProps) {
  const { pageName, subpage } = params;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subpage: {subpage}</h1>
      <p>This is a server-rendered subpage for the {pageName} prototype.</p>
      <p>Static export is working correctly!</p>
    </div>
  );
}
