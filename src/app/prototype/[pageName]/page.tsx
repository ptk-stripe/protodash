import React from 'react';

interface PrototypePageProps {
  params: Promise<{
    pageName: string;
  }>;
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return [
    { pageName: "example-dashboard" },
    // Add more prototypes here as they are created
  ];
}

export default async function PrototypePage({ params }: PrototypePageProps) {
  const { pageName } = await params;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Prototype: {pageName}</h1>
      <p>This is a server-rendered page for the {pageName} prototype.</p>
      <p>Static export is working correctly!</p>
    </div>
  );
}
