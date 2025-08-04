import { GeneratedBrief } from '@/lib/db/models';

export function generateHTMLBrief(brief: GeneratedBrief): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Brief: ${brief.projectName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9fafb;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
            padding: 40px 40px 30px 40px;
            color: white;
            text-align: center;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #38bdf8;
            margin-bottom: 10px;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 700;
        }
        
        .header .subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .content {
            padding: 40px;
        }
        
        .project-overview {
            background: #f0f9ff;
            border-left: 4px solid #38bdf8;
            padding: 25px;
            margin-bottom: 35px;
            border-radius: 0 8px 8px 0;
        }
        
        .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        
        .overview-item {
            display: flex;
            flex-direction: column;
        }
        
        .overview-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .overview-value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
        }
        
        .section {
            margin-bottom: 35px;
        }
        
        .section-title {
            font-size: 22px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
            padding-bottom: 8px;
            border-bottom: 2px solid #38bdf8;
        }
        
        .section-content {
            color: #475569;
            line-height: 1.7;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 15px;
        }
        
        .info-item {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 3px solid #38bdf8;
        }
        
        .info-label {
            font-size: 14px;
            font-weight: 600;
            color: #38bdf8;
            margin-bottom: 8px;
        }
        
        .info-value {
            color: #334155;
            font-size: 15px;
        }
        
        .deliverables-list {
            list-style: none;
            padding: 0;
        }
        
        .deliverables-list li {
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
            position: relative;
            padding-left: 25px;
        }
        
        .deliverables-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #38bdf8;
            font-weight: bold;
        }
        
        .deliverables-list li:last-child {
            border-bottom: none;
        }
        
        .timeline-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        
        .timeline-table th,
        .timeline-table td {
            padding: 15px 20px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .timeline-table th {
            background: #f1f5f9;
            font-weight: 600;
            color: #475569;
            font-size: 14px;
        }
        
        .timeline-table td {
            color: #334155;
        }
        
        .budget-highlight {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
        }
        
        .budget-amount {
            font-size: 24px;
            font-weight: 700;
            color: #92400e;
            margin-bottom: 5px;
        }
        
        .budget-label {
            font-size: 14px;
            color: #a16207;
            font-weight: 500;
        }
        
        .specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .spec-item {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 15px;
        }
        
        .spec-label {
            font-size: 12px;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .spec-value {
            font-size: 14px;
            color: #1e293b;
            font-weight: 500;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-content {
            color: #64748b;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .cta-button {
            display: inline-block;
            background: #38bdf8;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin: 15px 0;
            transition: background-color 0.2s;
        }
        
        .cta-button:hover {
            background: #0ea5e9;
        }
        
        .flowork-brand {
            color: #38bdf8;
            font-weight: 700;
        }
        
        @media (max-width: 600px) {
            .header, .content, .footer {
                padding: 20px;
            }
            
            .overview-grid, .info-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .section-title {
                font-size: 20px;
            }
        }
        
        @media print {
            body {
                background: white;
            }
            
            .container {
                box-shadow: none;
            }
            
            .cta-button {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">FLOWORK</div>
            <h1>Creative Brief</h1>
            <div class="subtitle">Professional Project Brief • Generated ${currentDate}</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Project Overview -->
            <div class="project-overview">
                <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 15px;">Project Overview</h2>
                <div class="overview-grid">
                    <div class="overview-item">
                        <div class="overview-label">Project Name</div>
                        <div class="overview-value">${brief.projectName}</div>
                    </div>
                    <div class="overview-item">
                        <div class="overview-label">Project Type</div>
                        <div class="overview-value">${brief.projectType}</div>
                    </div>
                    ${brief.company ? `
                    <div class="overview-item">
                        <div class="overview-label">Client</div>
                        <div class="overview-value">${brief.company}</div>
                    </div>
                    ` : ''}
                    ${brief.industry ? `
                    <div class="overview-item">
                        <div class="overview-label">Industry</div>
                        <div class="overview-value">${brief.industry}</div>
                    </div>
                    ` : ''}
                    <div class="overview-item">
                        <div class="overview-label">Project Manager</div>
                        <div class="overview-value">FLOWORK Project Manager</div>
                    </div>
                </div>
            </div>
            
            <!-- Business Context -->
            ${brief.businessContext ? `
            <div class="section">
                <h2 class="section-title">Business Context</h2>
                <div class="section-content">
                    ${brief.businessContext.description ? `
                    <div class="info-item">
                        <div class="info-label">Company Description</div>
                        <div class="info-value">${brief.businessContext.description}</div>
                    </div>
                    ` : ''}
                    ${brief.businessContext.objective ? `
                    <div class="info-item" style="margin-top: 15px;">
                        <div class="info-label">Project Objective</div>
                        <div class="info-value">${brief.businessContext.objective}</div>
                    </div>
                    ` : ''}
                    ${brief.businessContext.strategicContext ? `
                    <div class="info-item" style="margin-top: 15px;">
                        <div class="info-label">Strategic Context</div>
                        <div class="info-value">${brief.businessContext.strategicContext}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            <!-- Scope of Work -->
            ${brief.scopeOfWork ? `
            <div class="section">
                <h2 class="section-title">Scope of Work</h2>
                
                ${brief.scopeOfWork.deliverables && brief.scopeOfWork.deliverables.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #475569; font-size: 16px; margin-bottom: 15px;">Primary Deliverables</h3>
                    <ul class="deliverables-list">
                        ${brief.scopeOfWork.deliverables.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${brief.scopeOfWork.technicalSpecs ? `
                <div>
                    <h3 style="color: #475569; font-size: 16px; margin-bottom: 15px;">Technical Specifications</h3>
                    <div class="specs-grid">
                        ${brief.scopeOfWork.technicalSpecs.formats && brief.scopeOfWork.technicalSpecs.formats.length > 0 ? `
                        <div class="spec-item">
                            <div class="spec-label">File Formats</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.formats.join(', ')}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.dimensions ? `
                        <div class="spec-item">
                            <div class="spec-label">Dimensions</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.dimensions}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.resolution ? `
                        <div class="spec-item">
                            <div class="spec-label">Resolution</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.resolution}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.frameRate ? `
                        <div class="spec-item">
                            <div class="spec-label">Frame Rate</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.frameRate}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.duration ? `
                        <div class="spec-item">
                            <div class="spec-label">Duration</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.duration}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.colorRequirements ? `
                        <div class="spec-item">
                            <div class="spec-label">Color Requirements</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.colorRequirements}</div>
                        </div>
                        ` : ''}
                        ${brief.scopeOfWork.technicalSpecs.platformSpecs ? `
                        <div class="spec-item">
                            <div class="spec-label">Platform Specifications</div>
                            <div class="spec-value">${brief.scopeOfWork.technicalSpecs.platformSpecs}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            <!-- Timeline -->
            ${brief.timeline ? `
            <div class="section">
                <h2 class="section-title">Timeline & Milestones</h2>
                <table class="timeline-table">
                    <thead>
                        <tr>
                            <th>Milestone</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${brief.timeline.projectStart ? `
                        <tr>
                            <td>Project Start</td>
                            <td>${brief.timeline.projectStart}</td>
                        </tr>
                        ` : ''}
                        ${brief.timeline.firstPresentation ? `
                        <tr>
                            <td>First Concept Presentation</td>
                            <td>${brief.timeline.firstPresentation}</td>
                        </tr>
                        ` : ''}
                        ${brief.timeline.feedbackDue ? `
                        <tr>
                            <td>Client Feedback Due</td>
                            <td>${brief.timeline.feedbackDue}</td>
                        </tr>
                        ` : ''}
                        ${brief.timeline.revisionDeadline ? `
                        <tr>
                            <td>Revision Deadline</td>
                            <td>${brief.timeline.revisionDeadline}</td>
                        </tr>
                        ` : ''}
                        ${brief.timeline.finalDelivery ? `
                        <tr>
                            <td><strong>Final Delivery</strong></td>
                            <td><strong>${brief.timeline.finalDelivery}</strong></td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            ` : ''}
            
            <!-- Budget -->
            ${brief.budget ? `
            <div class="section">
                <h2 class="section-title">Budget & Investment</h2>
                
                ${brief.budget.clientRange ? `
                <div class="budget-highlight">
                    <div class="budget-amount">${brief.budget.clientRange}</div>
                    <div class="budget-label">Client's Initial Budget Range</div>
                </div>
                ` : ''}
                
                <div class="info-grid">
                    ${brief.budget.recommendedValue ? `
                    <div class="info-item">
                        <div class="info-label">Recommended Project Value</div>
                        <div class="info-value">${brief.budget.recommendedValue}</div>
                    </div>
                    ` : ''}
                    ${brief.budget.paymentSchedule ? `
                    <div class="info-item">
                        <div class="info-label">Payment Schedule</div>
                        <div class="info-value">${brief.budget.paymentSchedule}</div>
                    </div>
                    ` : ''}
                </div>
                
                ${brief.budget.justification ? `
                <div class="info-item" style="margin-top: 15px;">
                    <div class="info-label">Budget Justification</div>
                    <div class="info-value">${brief.budget.justification}</div>
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            <!-- Creative Direction -->
            ${brief.creativeDirection ? `
            <div class="section">
                <h2 class="section-title">Creative Direction</h2>
                <div class="info-grid">
                    ${brief.creativeDirection.style ? `
                    <div class="info-item">
                        <div class="info-label">Style Preferences</div>
                        <div class="info-value">${brief.creativeDirection.style}</div>
                    </div>
                    ` : ''}
                    ${brief.creativeDirection.colorPalette ? `
                    <div class="info-item">
                        <div class="info-label">Color Palette</div>
                        <div class="info-value">${brief.creativeDirection.colorPalette}</div>
                    </div>
                    ` : ''}
                    ${brief.creativeDirection.typography ? `
                    <div class="info-item">
                        <div class="info-label">Typography</div>
                        <div class="info-value">${brief.creativeDirection.typography}</div>
                    </div>
                    ` : ''}
                    ${brief.creativeDirection.mood ? `
                    <div class="info-item">
                        <div class="info-label">Mood & Tone</div>
                        <div class="info-value">${brief.creativeDirection.mood}</div>
                    </div>
                    ` : ''}
                </div>
                
                ${brief.creativeDirection.references && brief.creativeDirection.references.length > 0 ? `
                <div style="margin-top: 20px;">
                    <div class="info-label" style="margin-bottom: 10px;">References & Inspiration</div>
                    <ul class="deliverables-list">
                        ${brief.creativeDirection.references.map(ref => `<li>${ref}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            <!-- Target Audience -->
            ${brief.targetAudience ? `
            <div class="section">
                <h2 class="section-title">Target Audience</h2>
                <div class="info-grid">
                    ${brief.targetAudience.primary ? `
                    <div class="info-item">
                        <div class="info-label">Primary Audience</div>
                        <div class="info-value">${brief.targetAudience.primary}</div>
                    </div>
                    ` : ''}
                    ${brief.targetAudience.secondary ? `
                    <div class="info-item">
                        <div class="info-label">Secondary Audience</div>
                        <div class="info-value">${brief.targetAudience.secondary}</div>
                    </div>
                    ` : ''}
                    ${brief.targetAudience.behavior ? `
                    <div class="info-item">
                        <div class="info-label">User Behavior</div>
                        <div class="info-value">${brief.targetAudience.behavior}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            <!-- Additional Notes -->
            ${brief.additionalNotes ? `
            <div class="section">
                <h2 class="section-title">Additional Notes</h2>
                <div class="info-item">
                    <div class="info-value">${brief.additionalNotes}</div>
                </div>
            </div>
            ` : ''}
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <p><strong class="flowork-brand">FLOWORK</strong> • Professional Creative Brief</p>
                <p>Generated on ${currentDate} • Ready for project execution</p>
                <p style="margin-top: 15px; color: #94a3b8; font-size: 13px;">
                    This brief serves as the foundation for your creative project. Our Project Manager will contact you within 24 hours to discuss next steps.
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
}