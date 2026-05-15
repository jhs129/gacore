import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "FAQ Section",
  inputs: [
    { name: "title", type: "string", defaultValue: "Frequently asked questions" },
    {
      name: "theme",
      type: "string",
      defaultValue: "primaryLight",
      enum: [
        { label: "Primary Light", value: "primaryLight" },
        { label: "Secondary Light", value: "secondaryLight" },
        { label: "Secondary Accent", value: "secondaryAccent" },
      ],
    },
    {
      name: "backgroundColor",
      type: "string",
      defaultValue: "bg-red-50",
      enum: [
        { label: "Light Red", value: "bg-red-50" },
        { label: "Light Green", value: "bg-green-50" },
        { label: "Light Blue", value: "bg-blue-50" },
        { label: "Light Yellow", value: "bg-yellow-50" },
        { label: "White", value: "bg-white" },
      ],
    },
    {
      name: "items",
      type: "list",
      defaultValue: [
        {
          question: "How can Georgia CORE support me or my loved one through cancer?",
          answer: "Georgia CORE provides a range of support services including connecting you with clinical trials, financial assistance programs, emotional support resources, and access to Georgia's network of cancer specialists. We can help navigate your cancer journey from diagnosis through survivorship.",
        },
        {
          question: "How do I find a cancer clinical trial that's right for me?",
          answer: "Georgia CORE maintains a comprehensive database of cancer clinical trials available in Georgia. You can search for trials based on cancer type, location, and other criteria. Our patient navigators can also help you understand your options and connect with trial coordinators.",
        },
        {
          question: "How do I know if the cancer information I find online is trustworthy?",
          answer: "Look for information from established cancer organizations, academic medical centers, and government health agencies. Georgia CORE provides vetted, evidence-based information and can help you evaluate sources. Always discuss information you find with your healthcare provider before making decisions.",
        },
        {
          question: "What if I can't afford treatment or screenings?",
          answer: "Georgia CORE can connect you with financial assistance programs, including those that cover screening, treatment, medications, and related expenses. Many hospitals also offer charity care programs, and pharmaceutical companies may provide patient assistance programs for medications.",
        },
        {
          question: "Where can I find support beyond medical treatment?",
          answer: "Georgia CORE can connect you with support groups, counseling services, transportation assistance, lodging programs, and other practical support. We also partner with community organizations that provide services like meal delivery, housekeeping help, and childcare assistance during treatment.",
        },
      ],
      subFields: [
        { name: "question", type: "string", defaultValue: "Frequently asked question goes here?" },
        { name: "answer", type: "longText", defaultValue: "Answer to the frequently asked question goes here. Provide a clear and concise response that addresses the question completely." },
      ],
    },
  ],
});
