"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    category: "General Questions",
    question: "What is Flowork?",
    answer: "Flowork is an AI-powered managed freelance platform. Simply describe your project to our AI, and we handle everything - from finding vetted freelancers to managing the entire project until delivery. You relax, we handle the rest."
  },
  {
    category: "General Questions", 
    question: "How is Flowork different from other freelance platforms?",
    answer: "We're NOT a marketplace. We're a fully managed service. You don't browse, bid, or manage freelancers. We curate top 10% talent, manage the entire project via LINE, and guarantee delivery. Plus, freelancers pay 0% commission, attracting the best talent."
  },
  {
    category: "General Questions",
    question: "What types of projects can I use Flowork for?",
    answer: "Design (logos, websites, UI/UX), Development (websites, apps, systems), Content (writing, translation, video), and Marketing (campaigns, social media, SEO). Projects typically range from ฿5,000 to ฿100,000."
  },
  {
    category: "General Questions",
    question: "What languages does Flowork support?",
    answer: "Our platform and project management services are available in Thai and English. Freelancers may offer additional languages."
  },
  
  // For Clients
  {
    category: "For Clients",
    question: "How does the process work?",
    answer: "1. Chat with our AI about your project (5-10 minutes)\n2. Receive your free professional brief\n3. Get 4 freelancer options within 24 hours\n4. Choose your freelancer and pay 50% deposit\n5. Your PM manages everything via LINE\n6. Pay remaining 50% upon delivery"
  },
  {
    category: "For Clients",
    question: "How quickly can I get freelancer options?",
    answer: "Within 24 hours of confirming your brief, we'll present 4 curated options - 2 within your budget and 2 premium alternatives."
  },
  {
    category: "For Clients",
    question: "What if I don't like any of the freelancer options?",
    answer: "We can provide alternative options once. If you're still not satisfied, you can cancel without any charges (if you haven't confirmed a freelancer yet)."
  },
  {
    category: "For Clients",
    question: "How do you select freelancers?",
    answer: "We accept only the top 10% of applicants based on portfolio quality, experience, peer reviews, and successful test projects. All freelancers are vetted before joining our platform."
  },
  {
    category: "For Clients",
    question: "What's your delivery guarantee?",
    answer: "We guarantee your project will be completed and delivered as per the agreed brief. If a freelancer cannot complete it, we'll assign a replacement at no extra cost. Note: We guarantee delivery, not subjective satisfaction."
  },
  {
    category: "For Clients",
    question: "What happens if the freelancer disappears?",
    answer: "We immediately assign a qualified replacement at no additional cost. There may be a 3-7 day adjustment to the timeline. We handle all the stress - you'll be updated via LINE."
  },
  {
    category: "For Clients",
    question: "How do payments work?",
    answer: "• 50% deposit upon freelancer selection\n• 50% balance upon delivery approval\n• We accept bank transfer, credit card, and PromptPay\n• Prices include all platform fees and project management"
  },
  {
    category: "For Clients",
    question: "Can I communicate directly with the freelancer?",
    answer: "All communication goes through your dedicated PM via LINE. This ensures professional project management, quality control, and protects both parties."
  },
  {
    category: "For Clients",
    question: "What if I need revisions?",
    answer: "Reasonable revisions are included based on the original brief. Your PM will coordinate all revision requests. Major scope changes may require additional payment."
  },
  {
    category: "For Clients",
    question: "Can I hire the same freelancer again?",
    answer: "Absolutely! You can request the same freelancer for future projects through our platform."
  },
  
  // For Freelancers
  {
    category: "For Freelancers",
    question: "How do I join Flowork?",
    answer: "Apply through our website with your portfolio. We review applications within 48 hours. If accepted, you'll be matched with relevant projects immediately."
  },
  {
    category: "For Freelancers",
    question: "Is there really 0% commission?",
    answer: "Yes! You keep 100% of your quoted rate. We make money from the client side, not from your earnings."
  },
  {
    category: "For Freelancers",
    question: "How do I get projects?",
    answer: "We match you with relevant projects based on your skills and rates. No bidding or proposals needed. When matched, you'll receive project details to accept or decline."
  },
  {
    category: "For Freelancers",
    question: "When do I get paid?",
    answer: "Within 7 business days of completing each milestone. We guarantee your payment even if there are client-side delays."
  },
  {
    category: "For Freelancers",
    question: "What if a client is difficult?",
    answer: "Your PM handles all client communication. You focus on the work. If issues arise, we mediate and protect your interests."
  },
  {
    category: "For Freelancers",
    question: "Can I decline projects?",
    answer: "Yes, you can decline projects that don't fit your schedule or expertise. We just ask for a quick response so we can find alternatives."
  },
  {
    category: "For Freelancers",
    question: "What about my portfolio rights?",
    answer: "You retain the right to showcase completed work in your portfolio unless covered by an NDA. All IP transfers to client upon final payment."
  },
  
  // Pricing & Payments
  {
    category: "Pricing & Payments",
    question: "How much does Flowork cost?",
    answer: "For clients: Your project cost includes freelancer fees plus our management service (typically 15-25% markup). No hidden fees. For freelancers: FREE - 0% commission, no fees ever."
  },
  {
    category: "Pricing & Payments",
    question: "Are prices negotiable?",
    answer: "Prices are set based on freelancer rates and project scope. We ensure fair pricing for everyone. Focus is on value, not negotiation."
  },
  {
    category: "Pricing & Payments",
    question: "What payment methods do you accept?",
    answer: "Bank transfer, credit/debit cards, PromptPay. For large projects, we can arrange payment terms."
  },
  {
    category: "Pricing & Payments",
    question: "Do you offer refunds?",
    answer: "Yes, see our refund policy. Key points: full refund before freelancer selection, delivery guarantee, and pro-rated refunds for partial work."
  },
  
  // Project Management
  {
    category: "Project Management",
    question: "Who is my PM?",
    answer: "A dedicated Flowork project manager fluent in your preferred language (Thai or English) who specializes in your project type."
  },
  {
    category: "Project Management",
    question: "How do I communicate with my PM?",
    answer: "Primarily through LINE for real-time updates. Email for formal documentation. All communication is during business hours with response within 2-4 hours."
  },
  {
    category: "Project Management",
    question: "What if I'm not happy with my PM?",
    answer: "Contact support@flowork.one and we'll assign a new PM within 24 hours."
  },
  {
    category: "Project Management",
    question: "How long do projects typically take?",
    answer: "• Small projects (logos, articles): 3-7 days\n• Medium projects (websites, campaigns): 2-4 weeks\n• Large projects (systems, full branding): 4-8 weeks"
  },
  
  // Technical & Platform
  {
    category: "Technical & Platform",
    question: "Do I need to download any software?",
    answer: "No. Everything works through your web browser and LINE app."
  },
  {
    category: "Technical & Platform",
    question: "Is my data secure?",
    answer: "Yes. We use bank-level encryption, secure servers, and never share your data with third parties. See our Privacy Policy for details."
  },
  {
    category: "Technical & Platform",
    question: "What about NDAs and confidentiality?",
    answer: "We can arrange NDAs for sensitive projects. All freelancers agree to confidentiality terms by default."
  },
  {
    category: "Technical & Platform",
    question: "Can I use the AI-generated brief elsewhere?",
    answer: "Yes! The brief is yours to use anywhere. We hope you'll choose us, but there's no obligation."
  },
  
  // Support & Help
  {
    category: "Support & Help",
    question: "How do I contact support?",
    answer: "Email: support@flowork.one\nLINE: @flowork-support\nResponse within 24 hours (usually faster)"
  },
  {
    category: "Support & Help",
    question: "What are your operating hours?",
    answer: "Platform: 24/7\nPM support: Monday-Friday 9:00-18:00 (Bangkok time)\nWeekend support for urgent issues only"
  },
  {
    category: "Support & Help",
    question: "What if I have a complaint?",
    answer: "Email complaints@flowork.one or message your PM directly. Senior management reviews all complaints within 48 hours."
  },
  {
    category: "Support & Help",
    question: "Do you have a satisfaction guarantee?",
    answer: "We guarantee delivery according to the agreed brief. For quality concerns, we work with you and the freelancer to resolve issues fairly."
  },
  
  // Quick Answers
  {
    category: "Quick Answers",
    question: "Minimum project size?",
    answer: "฿5,000"
  },
  {
    category: "Quick Answers",
    question: "Maximum project size?",
    answer: "No limit, but projects over ฿100,000 get special handling"
  },
  {
    category: "Quick Answers",
    question: "Rush delivery available?",
    answer: "Yes, with 30-50% rush fee"
  },
  {
    category: "Quick Answers",
    question: "International clients?",
    answer: "Yes, we serve all of Southeast Asia"
  },
  {
    category: "Quick Answers",
    question: "Multiple projects?",
    answer: "Yes, with dedicated account management"
  },
  {
    category: "Quick Answers",
    question: "Enterprise accounts?",
    answer: "Contact enterprise@flowork.one"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < answer.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  // Group FAQs by category
  const groupedFAQs = faqData.reduce((acc, faq, index) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push({ ...faq, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<FAQItem & { originalIndex: number }>>);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-700 mb-8">
              Frequently Asked Questions
            </h1>
            
            {/* Beta Disclaimer */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
              <p className="text-amber-700 text-sm">
                <strong>BETA VERSION</strong> - We&apos;re testing Flowork with limited users. FAQ may change.
              </p>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about Flowork. Still have questions? Contact us at hello@flowork.one or start a chat with our AI assistant!
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {Object.entries(groupedFAQs).map(([category, faqs]) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-neutral-700 mb-6 pb-2 border-b border-neutral-200">
                  {category}
                </h2>
                
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <div
                      key={faq.originalIndex}
                      className="border border-neutral-200 rounded-lg bg-white overflow-hidden transition-all duration-200 hover:shadow-md"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(faq.originalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset"
                      >
                        <span className="text-lg font-medium text-neutral-700 pr-4">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0">
                          {openIndex === faq.originalIndex ? (
                            <Minus className="w-5 h-5 text-sky-500 transition-transform duration-200" />
                          ) : (
                            <Plus className="w-5 h-5 text-neutral-400 transition-transform duration-200" />
                          )}
                        </div>
                      </button>
                      
                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === faq.originalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-4 pt-0">
                          <div className="border-t border-neutral-100 pt-4">
                            <p className="text-gray-600 leading-relaxed">
                              {formatAnswer(faq.answer)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}