"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { GeneratedBrief } from '@/lib/db/models';
import Link from 'next/link';

interface BriefData {
  brief: GeneratedBrief;
  projectType: string;
  createdAt: string;
  company?: string;
}

export default function BriefPage() {
  const { id } = useParams();
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBrief = async () => {
      try {
        const response = await fetch(`/api/brief/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Brief not found');
          } else {
            setError('Failed to load brief');
          }
          return;
        }

        const data = await response.json();
        setBriefData(data);
      } catch (err) {
        setError('Failed to load brief');
        console.error('Error fetching brief:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrief();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading brief...</div>
      </div>
    );
  }

  if (error || !briefData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-800 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-black/80 border-gray-700/30">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              {error || 'Brief not found'}
            </h2>
            <Link href="/">
              <Button className="bg-sky-500 hover:bg-sky-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { brief, projectType, createdAt } = briefData;

  const handleDownload = () => {
    const briefText = generateBriefText(brief);
    const blob = new Blob([briefText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brief.projectName || 'Brief'}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-sky-400 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">{brief.projectName}</h1>
            <p className="text-gray-400 mt-2">
              {projectType} • Created {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="bg-sky-500 hover:bg-sky-600">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Project Overview */}
          {brief.businessContext && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                {brief.company && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Client</h4>
                    <p>{brief.company}</p>
                  </div>
                )}
                {brief.businessContext.description && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Description</h4>
                    <p>{brief.businessContext.description}</p>
                  </div>
                )}
                {brief.businessContext.objective && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Objective</h4>
                    <p>{brief.businessContext.objective}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Scope of Work */}
          {brief.scopeOfWork && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Scope of Work</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                {brief.scopeOfWork.deliverables && brief.scopeOfWork.deliverables.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Deliverables</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {brief.scopeOfWork.deliverables.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {brief.scopeOfWork.technicalSpecs && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Technical Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(brief.scopeOfWork.technicalSpecs).map(([key, value]) => 
                        value && (
                          <div key={key}>
                            <span className="text-sky-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="ml-2">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {brief.timeline && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3">
                {Object.entries(brief.timeline).map(([key, value]) => 
                  value && (
                    <div key={key} className="flex justify-between">
                      <span className="text-sky-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span>{value}</span>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          {/* Budget */}
          {brief.budget && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Budget</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                {Object.entries(brief.budget).map(([key, value]) => 
                  value && (
                    <div key={key}>
                      <h4 className="font-semibold text-sky-400 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p>{value}</p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          {/* Creative Direction */}
          {brief.creativeDirection && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Creative Direction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                {Object.entries(brief.creativeDirection).map(([key, value]) => 
                  value && (key !== 'references' || (Array.isArray(value) && value.length > 0)) && (
                    <div key={key}>
                      <h4 className="font-semibold text-sky-400 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      {Array.isArray(value) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          {/* Target Audience */}
          {brief.targetAudience && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Target Audience</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                {Object.entries(brief.targetAudience).map(([key, value]) => 
                  value && (
                    <div key={key}>
                      <h4 className="font-semibold text-sky-400 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p>{value}</p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          {/* Additional Notes */}
          {brief.additionalNotes && (
            <Card className="bg-black/80 border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>{brief.additionalNotes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function generateBriefText(brief: GeneratedBrief): string {
  let text = `# Creative Brief: ${brief.projectName}\n\n`;
  
  if (brief.company) {
    text += `**Client:** ${brief.company}\n`;
  }
  
  if (brief.businessContext?.description) {
    text += `\n## Project Overview\n${brief.businessContext.description}\n`;
  }
  
  if (brief.businessContext?.objective) {
    text += `\n## Objective\n${brief.businessContext.objective}\n`;
  }
  
  if (brief.scopeOfWork?.deliverables && brief.scopeOfWork.deliverables.length > 0) {
    text += `\n## Deliverables\n`;
    brief.scopeOfWork.deliverables.forEach(item => {
      text += `- ${item}\n`;
    });
  }
  
  if (brief.timeline) {
    text += `\n## Timeline\n`;
    Object.entries(brief.timeline).forEach(([key, value]) => {
      if (value) {
        text += `**${key.replace(/([A-Z])/g, ' $1').trim()}:** ${value}\n`;
      }
    });
  }
  
  if (brief.budget?.clientRange) {
    text += `\n## Budget\n**Client Range:** ${brief.budget.clientRange}\n`;
    if (brief.budget.recommendedValue) {
      text += `**Recommended Value:** ${brief.budget.recommendedValue}\n`;
    }
  }
  
  return text;
}