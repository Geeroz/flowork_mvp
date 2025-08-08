"use client";

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-700 mb-8">
              Website Policies
            </h1>
            
            {/* Beta Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-amber-800 mb-2">BETA SERVICE DISCLAIMER</h3>
                  <div className="text-amber-700">
                    <p className="mb-2">This is a <strong>BETA version</strong> of Flowork provided &ldquo;as-is&rdquo; for testing purposes. By using Flowork Beta:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>You acknowledge the service is not final and may contain bugs</li>
                      <li>Features, pricing, and policies may change without notice</li>
                      <li>We may reset or delete data with 7 days notice</li>
                      <li>Support is provided on a best-effort basis</li>
                      <li>We are not liable for any losses during beta period</li>
                      <li>Service may be discontinued at any time</li>
                    </ul>
                    <p className="mt-2 font-semibold">Beta Period: August 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl space-y-12">
            
            {/* 1. Terms of Service */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">1. Terms of Service</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Account Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Must be 18+ years old or legal business entity</li>
                    <li>One account per person/business</li>
                    <li>Accurate information required</li>
                    <li>Responsible for account security</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Platform Usage</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Flowork is a managed service platform, not a marketplace</li>
                    <li>We facilitate and manage projects between clients and freelancers</li>
                    <li>AI-generated briefs are provided as-is for assistance purposes</li>
                    <li>Users must not misuse platform for illegal activities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Service Scope</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>We guarantee project delivery as per approved brief</li>
                    <li>We do NOT guarantee subjective satisfaction</li>
                    <li>If freelancer cannot complete, we assign replacement at no extra cost</li>
                    <li>All project communication should go through designated PM</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Payment Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Clients pay 50% upfront, 50% on delivery</li>
                    <li>Prices include platform fee and project management</li>
                    <li>Freelancers receive 100% of their quoted rate</li>
                    <li>Payments processed within 7 business days of milestone completion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Privacy Policy */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">2. Privacy Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Information We Collect</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Account information (name, email, phone, company)</li>
                    <li>Project details and briefs</li>
                    <li>Communication through platform</li>
                    <li>Payment information (processed securely via third-party)</li>
                    <li>Usage data and analytics</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">How We Use Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>To provide and improve our services</li>
                    <li>Match clients with suitable freelancers</li>
                    <li>Process payments and manage projects</li>
                    <li>Send service updates and marketing (with consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Information Sharing</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>With freelancers/clients (only project-relevant information)</li>
                    <li>Payment processors for transactions</li>
                    <li>Service providers (hosting, analytics)</li>
                    <li>Legal compliance when required</li>
                    <li><strong>Never sold to third parties</strong></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Data Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Industry-standard encryption</li>
                    <li>Secure servers and regular backups</li>
                    <li>Limited access on need-to-know basis</li>
                    <li>Regular security audits</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Your Rights</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Access your personal data</li>
                    <li>Request corrections or deletion</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability upon request</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Refund & Cancellation Policy */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">3. Refund & Cancellation Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">For Clients</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-neutral-600 mb-2">Before Project Starts:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>No payment required until you select and confirm a freelancer</li>
                        <li>You can cancel anytime before confirming your freelancer selection</li>
                        <li>100% refund if we cannot provide suitable freelancer options within 72 hours of your brief submission</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-neutral-600 mb-2">After Project Confirmation:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Project begins only after you confirm freelancer selection and pay 50% deposit</li>
                        <li>50% deposit non-refundable once freelancer begins work</li>
                        <li>Exceptions for documented non-performance</li>
                        <li>Partial refunds for partially completed work</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-neutral-600 mb-2">Guaranteed Delivery:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>If freelancer abandons project, we assign a replacement at no additional cost</li>
                        <li>Timeline may be adjusted due to transition to new freelancer</li>
                        <li>We&apos;ll provide revised delivery schedule within 48 hours of reassignment</li>
                        <li>Full refund of remaining balance if we cannot find replacement within 7 days</li>
                        <li>Partial refund of deposit if you choose to cancel instead of accepting replacement</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-medium text-blue-800 mb-2">Important Notes:</h4>
                      <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                        <li>&ldquo;Suitable freelancer&rdquo; means we present at least 2 options matching your requirements</li>
                        <li>Delivery dates may be extended by 3-7 business days when replacing freelancers</li>
                        <li>We&apos;ll keep you updated via LINE throughout any transitions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">For Freelancers</h3>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-600 mb-2">Project Cancellation:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>If client cancels after work begins, freelancer paid for completed milestones</li>
                      <li>Kill fee of 25% for sudden client cancellation</li>
                      <li>Full payment if client-side delays exceed 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Content & Intellectual Property */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">4. Content & Intellectual Property</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Ownership</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Clients own all rights to delivered work upon final payment</li>
                    <li>Freelancers may showcase work in portfolio (unless NDA)</li>
                    <li>Flowork may use anonymized success stories for marketing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">AI-Generated Content</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Brief templates generated by AI are free to use</li>
                    <li>No warranty on AI-generated suggestions</li>
                    <li>Users responsible for reviewing and editing AI output</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Prohibited Content</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Illegal or harmful content</li>
                    <li>Copyright infringement</li>
                    <li>Hate speech or discrimination</li>
                    <li>Adult content without prior approval</li>
                    <li>Misleading or fraudulent material</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Code of Conduct */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">5. Code of Conduct</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">All Users Must:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Communicate professionally and respectfully</li>
                    <li>Provide honest and accurate information</li>
                    <li>Meet agreed deadlines and commitments</li>
                    <li>Respect intellectual property rights</li>
                    <li>Report any issues to platform immediately</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Prohibited Behavior:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Circumventing platform for direct deals</li>
                    <li>Harassment or discrimination</li>
                    <li>Sharing confidential information</li>
                    <li>Creating multiple accounts</li>
                    <li>Using platform for spam or solicitation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Dispute Resolution */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">6. Dispute Resolution</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Our Process:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>First attempt: PM mediates between parties</li>
                    <li>Escalation: Senior management review</li>
                    <li>Evidence-based decision within 5 business days</li>
                    <li>Platform decision is final for amounts under ฿50,000</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">For Major Disputes:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Arbitration for amounts over ฿50,000</li>
                    <li>Governed by Thai law</li>
                    <li>Bangkok jurisdiction</li>
                    <li>Each party bears own legal costs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Platform Changes & Communication */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">7. Platform Changes & Communication</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">We Reserve Right To:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Update policies with 30 days notice</li>
                    <li>Modify features and services</li>
                    <li>Adjust pricing with 60 days notice</li>
                    <li>Suspend accounts violating terms</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-neutral-600 mb-3">Communication:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Primary contact via registered email</li>
                    <li>LINE for project-related updates</li>
                    <li>Policy updates posted on website</li>
                    <li>Service announcements via dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 8. Limitation of Liability */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-700 mb-6">8. Limitation of Liability</h2>
              
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Platform liability limited to project fee paid</li>
                <li>Not responsible for indirect or consequential damages</li>
                <li>Not liable for work quality beyond delivery guarantee</li>
                <li>Force majeure provisions apply</li>
              </ul>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}