import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

// Import your components
const CancerCareHero = dynamic(() => import("./components/ui/CancerCareHero"));
const Module4 = dynamic(() => import("./components/ui/Module4"));
const Mod2 = dynamic(() => import("./components/ui/Mod2"));
const FAQ = dynamic(() => import("./components/ui/FAQ"));

// Register your components
Builder.registerComponent(CancerCareHero, {
  name: "CancerCareHero",
  inputs: [
    {
      name: "tagline",
      type: "string",
      defaultValue: "Stronger together:",
    },
    {
      name: "title",
      type: "string",
      defaultValue: "Your trusted path to cancer care in Georgia.",
    },
    {
      name: "searchTitle",
      type: "string",
      defaultValue: "Find the care & support you need",
    },
    {
      name: "heroImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1100317535e68237decbddcd2d241bfa1e1d98c9",
    },
    {
      name: "heroImageAlt",
      type: "string",
      defaultValue: "Healthcare professionals providing cancer care",
    },
  ],
});

Builder.registerComponent(Module4, {
  name: "Support Resources",
  inputs: [
    {
      name: "backgroundImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/8b87078e14ad05d684ddddf38f1c7414c9a662f7?placeholderIfAbsent=true",
    },
    {
      name: "heading",
      type: "string",
      defaultValue:
        "Cancer impacts more than your health. We're here to connect you to resources that support your whole journey.",
    },
    {
      name: "buttonText",
      type: "string",
      defaultValue: "View all support resources",
    },
    {
      name: "buttonUrl",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "cards",
      type: "list",
      defaultValue: [
        {
          iconType: "financial",
          title: "Financial Relief",
          description:
            "Cost should never be a barrier to care. Find programs that can help ease the financial burden of cancer treatment.",
          linkText: "Explore financial assistance",
          linkUrl: "#",
        },
        {
          iconType: "emotional",
          title: "Emotional Support",
          description:
            "You are not alone. Connect with people who understand and find support along the way.",
          linkText: "Find a support group",
          linkUrl: "#",
        },
        {
          iconType: "practical",
          title: "Practical help",
          description:
            "From transportation to housing, we help you focus on healing by connecting you to essential services.",
          linkText: "Get practical assistance",
          linkUrl: "#",
        },
      ],
      subFields: [
        {
          name: "iconType",
          type: "string",
          enum: ["financial", "emotional", "practical"],
          defaultValue: "financial",
        },
        {
          name: "title",
          type: "string",
          defaultValue: "Support Card Title",
        },
        {
          name: "description",
          type: "string",
          defaultValue: "Description of the support resource",
        },
        {
          name: "linkText",
          type: "string",
          defaultValue: "Learn more",
        },
        {
          name: "linkUrl",
          type: "string",
          defaultValue: "#",
        },
      ],
    },
  ],
});

Builder.registerComponent(FAQ, {
  name: "FAQ Section",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Frequently asked questions",
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
          question:
            "How can Georgia CORE support me or my loved one through cancer?",
          answer:
            "Georgia CORE provides a range of support services including connecting you with clinical trials, financial assistance programs, emotional support resources, and access to Georgia's network of cancer specialists. We can help navigate your cancer journey from diagnosis through survivorship.",
        },
        {
          question:
            "How do I find a cancer clinical trial that's right for me?",
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
      subFields: [
        {
          name: "question",
          type: "string",
          defaultValue: "Frequently asked question goes here?",
        },
        {
          name: "answer",
          type: "longText",
          defaultValue:
            "Answer to the frequently asked question goes here. Provide a clear and concise response that addresses the question completely.",
        },
      ],
    },
  ],
});


Builder.registerComponent(Mod2, {
  name: "Mod2",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue:
        "Every cancer journey is unique. We're here to guide you through yours.",
    },
    {
      name: "tabs",
      type: "list",
      subFields: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "label",
          type: "string",
        },
        {
          name: "isActive",
          type: "boolean",
          defaultValue: false,
        },
      ],
      defaultValue: [
        { id: "newly-diagnosed", label: "Newly diagnosed", isActive: true },
        { id: "treatment", label: "Undergoing treatment", isActive: false },
        { id: "survivor", label: "Survivor", isActive: false },
      ],
    },
    {
      name: "cards",
      type: "list",
      subFields: [
        {
          name: "iconSrc",
          type: "string",
        },
        {
          name: "text",
          type: "string",
        },
        {
          name: "linkUrl",
          type: "string",
        },
      ],
      defaultValue: [
        {
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/710bb545f70f803b0cc93e61dc89c754cc801b9a?placeholderIfAbsent=true",
          text: "Find a doctor or cancer center near you",
          linkUrl: "#",
        },
        {
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/afe4e8e029d5037450c728c791a3ef6d55f2d743?placeholderIfAbsent=true",
          text: "Understand your diagnosis & treatment",
          linkUrl: "#",
        },
        {
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/c3ed767f9c66fdf592499e4a7111bf5f354e8811?placeholderIfAbsent=true",
          text: "Get financial & emotional support",
          linkUrl: "#",
        },
        {
          iconSrc:
            "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/6bcfcbd586711c3127d1e42494d470c1701cbcd2?placeholderIfAbsent=true",
          text: "Explore additionalresources",
          linkUrl: "#",
        },
      ],
    },
    {
      name: "imageSrc",
      type: "string",
      defaultValue:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1fd67c6e443e2ba97e0c14d58120b749616041cf?placeholderIfAbsent=true",
    },
    {
      name: "imageAlt",
      type: "string",
      defaultValue: "Cancer support image",
    },
  ],
});
