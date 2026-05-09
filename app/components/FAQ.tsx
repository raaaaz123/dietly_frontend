"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How accurate is the AI food recognition?",
    a: "Our GPT-4o vision model achieves ~98% accuracy on common meals. It identifies individual ingredients, estimates portions, and calculates macros in under 2 seconds. You can always adjust the AI's estimates before confirming.",
  },
  {
    q: "Do I need a subscription to use Dietly?",
    a: "The free tier includes food logging (5 meals/day), basic macro tracking, water tracking, and 3 AI coach messages per day. Pro unlocks unlimited everything, voice commands, workout tracking, wearable sync, and priority support for $9.99/mo.",
  },
  {
    q: "What makes the AI coach different from ChatGPT?",
    a: "Unlike generic AI, our coach has persistent memory — it remembers your preferences, history, and goals across conversations. It uses RAG over your personal data and curated nutrition science to give evidence-backed, personalized advice.",
  },
  {
    q: "Is my health data private and secure?",
    a: "Absolutely. Your data is encrypted at rest and in transit. We never sell your data or use it to train AI models. You can export or delete all your data at any time. We're GDPR and CCPA compliant.",
  },
  {
    q: "What devices and wearables are supported?",
    a: "Dietly is available on iOS and Android. We integrate with Apple HealthKit, Google Health Connect, and support data from Whoop, Oura, Garmin, Fitbit, and Apple Watch for recovery scoring and adaptive plans.",
  },
  {
    q: "Can I use voice to log meals and workouts?",
    a: "Yes! On Pro, you can speak naturally — \"I had a chicken caesar salad and a sparkling water for lunch\" — and our Whisper + GPT pipeline will parse and log everything. During workouts, use hands-free voice to track sets and reps in real time via Gemini Live.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full py-6 md:py-7 flex items-start justify-between gap-6 text-left group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] md:text-[17px] font-semibold text-fg group-hover:text-accent transition-colors duration-300 leading-snug">
                {faq.q}
              </span>
              <span
                className={`text-[20px] text-muted transition-transform duration-300 shrink-0 mt-0.5 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-[300px] pb-7" : "max-h-0"
              }`}
            >
              <p className="text-[14px] md:text-[15px] leading-relaxed text-muted pr-12">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
