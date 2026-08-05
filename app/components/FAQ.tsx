"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How accurate is the AI food recognition?",
    a: "Dietly's AI achieves ~98% accuracy on common meals. It identifies individual ingredients, estimates portions, and calculates calories and macros in under 2 seconds. You can always adjust the estimates before confirming.",
  },
  {
    q: "Do I need a subscription to use Dietly?",
    a: "No. The free tier includes food logging (5 meals/day), basic macro tracking, water tracking, and 3 AI coach messages per day. Pro unlocks unlimited everything, voice logging, workout tracking, wearable sync, and priority support for $9.99/month.",
  },
  {
    q: "What makes the Dietly AI coach different?",
    a: "Unlike generic AI assistants, Rexa — Dietly's built-in coach — has persistent memory. It remembers your preferences, history, and goals across every conversation to give personalized, evidence-backed advice that improves over time.",
  },
  {
    q: "Is my health data private and secure?",
    a: "Absolutely. Your data is encrypted at rest and in transit. We never sell your data, share it with third parties, or use it to train AI models. You can export or delete all your data at any time.",
  },
  {
    q: "What devices and wearables are supported?",
    a: "Dietly is available on iOS and Android. It integrates with Apple HealthKit and Google Health Connect, and supports data from Whoop, Oura, Garmin, Fitbit, and Apple Watch.",
  },
  {
    q: "Can I use voice to log meals and workouts?",
    a: "Yes. On Pro, just speak naturally — \"I had a chicken caesar salad and sparkling water for lunch\" — and Dietly logs everything automatically. During workouts, use hands-free voice to track sets and reps in real time.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className={`rounded-2xl border transition-colors duration-300 ${
              isOpen
                ? "border-border-accent bg-green-50"
                : "border-border bg-elevated"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className={`text-[15px] md:text-[16.5px] font-bold leading-snug transition-colors ${
                  isOpen ? "text-accent-deep" : "text-fg"
                }`}
              >
                {faq.q}
              </span>
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-accent bg-accent text-white"
                    : "border-border-strong text-fg-muted"
                }`}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                  <path
                    d="M6 1.6v8.8M1.6 6h8.8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[14px] md:text-[15px] leading-relaxed text-fg-muted">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
