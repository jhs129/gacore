"use client";
import * as React from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  items?: FAQItem[];
  backgroundColor?: string;
}

const FAQ: React.FC<FAQProps> = ({
  title = "Frequently asked questions",
  items = [
    {
      question:
        "How can Georgia CORE support me or my loved one through cancer?",
      answer:
        "Georgia CORE provides a range of support services including connecting you with clinical trials, financial assistance programs, emotional support resources, and access to Georgia's network of cancer specialists. We can help navigate your cancer journey from diagnosis through survivorship.",
    },
    {
      question: "How do I find a cancer clinical trial that's right for me?",
      answer:
        "Georgia CORE maintains a comprehensive database of cancer clinical trials available in Georgia. You can search for trials based on cancer type, location, and other criteria. Our patient navigators can also help you understand your options and connect with trial coordinators.",
    },
    {
      question:
        "How do I know if the cancer information I find online is trustworthy?",
      answer:
        "Look for information from established cancer organizations, academic medical centers, and government health agencies. Georgia CORE provides vetted, evidence-based information and can help you evaluate sources. Always discuss information you find with your healthcare provider before making decisions.",
    },
    {
      question: "What if I can't afford treatment or screenings?",
      answer:
        "Georgia CORE can connect you with financial assistance programs, including those that cover screening, treatment, medications, and related expenses. Many hospitals also offer charity care programs, and pharmaceutical companies may provide patient assistance programs for medications.",
    },
    {
      question: "Where can I find support beyond medical treatment?",
      answer:
        "Georgia CORE can connect you with support groups, counseling services, transportation assistance, lodging programs, and other practical support. We also partner with community organizations that provide services like meal delivery, housekeeping help, and childcare assistance during treatment.",
    },
  ],
  backgroundColor = "bg-red-50",
}) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // SVG for the chevron icon
  const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8.21936 12.4144C8.44702 12.4132 8.65302 12.3258 8.82227 12.1479L13.921 6.9244C14.0674 6.77802 14.1463 6.59695 14.1463 6.38494C14.1463 5.94753 13.8068 5.60254 13.3731 5.60254C13.1611 5.60254 12.9636 5.68758 12.8124 5.83691L7.89148 10.8838H8.54656L3.62076 5.83691C3.47385 5.68999 3.27764 5.60254 3.05894 5.60254C2.62395 5.60254 2.28564 5.94753 2.28564 6.38494C2.28564 6.59575 2.36587 6.77682 2.50984 6.9299L7.61091 12.1479C7.79118 12.3282 7.98738 12.4144 8.21936 12.4144Z"
        fill="#302F2E"
      />
    </svg>
  );

  return (
    <section
      className={`flex gap-16 items-start px-16 py-20 ${backgroundColor} max-md:flex-col max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-10`}
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-3xl text-zinc-800 w-[240px] shrink-0 max-md:mb-6 max-md:w-full max-sm:text-3xl"
      >
        {title}
      </h2>
      <div className="flex flex-col flex-1">
        {items.map((item, index) => (
          <div
            key={`faq-item-${index}`}
            className="flex flex-col justify-center items-center p-2 w-full border-t border-solid border-t-zinc-800 border-t-opacity-20 max-sm:p-4"
          >
            <div
              className="flex gap-6 justify-between items-center w-full text-left py-4 px-6  !text-zinc-800 hover:!text-zinc-800"
              onClick={() => toggleQuestion(index)}
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex-1 text-lg leading-7 text-zinc-800 max-sm:text-base">
                {item.question}
              </div>
              <div>
                <ChevronIcon isExpanded={expandedIndex === index} />
              </div>
            </div>
            {expandedIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="mt-4 text-base text-zinc-700 w-full px-6"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
