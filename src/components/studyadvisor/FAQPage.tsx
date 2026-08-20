// src/components/studyadvisor/FAQPage.tsx
import React, { useState } from 'react';  // ← ADD THIS IMPORT

const faqs = [
  { q: "How do I apply for admission?", a: "Go to Admission page, fill the form, upload documents, and pay application fee." },
  { q: "What documents are required?", a: "Matric certificate, Intermediate certificate, CNIC/B-Form, photographs, domicile." },
  { q: "When are admission deadlines?", a: "Deadlines vary by university. Check the Deadlines tab in Admission page." },
  { q: "How to check application status?", a: "Go to 'My Applications' page to track your applications." },
  { q: "How long does admission process take?", a: "Typically 2-4 weeks after application submission deadline." },
  { q: "Can I apply to multiple universities?", a: "Yes, you can apply to as many universities as you want." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-[#1E3A8F] text-center mb-4">Frequently Asked Questions</h1>
        <p className="text-center text-gray-600 mb-8">Find answers to common questions about admissions</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="text-[#1E3A8F]">{faq.q}</span>
                <span className="text-[#00C7B1] text-xl">{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600 border-t">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}