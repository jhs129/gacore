import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

import ClinicalTrialSearch from "./components/search/ClinicalTrialSearch";
import Module4 from "./components/ui/Module4";
import Module6 from "./components/ui/Module6";
// Import your components
const CancerCareHero = dynamic(() => import("./components/ui/CancerCareHero"));
const Mod2 = dynamic(() => import("./components/ui/Mod2"));
const FAQ = dynamic(() => import("./components/ui/FAQ"));

Builder.registerComponent(ClinicalTrialSearch, {
  name: "ClinicalTrialSearch",
  inputs: [
    {
      name: "backgroundImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      required: false,
      helperText: "Optional background image for the header section",
    },
    {
      name: "mainTitle",
      type: "string",
      defaultValue: "Your trusted path to clinical trials.",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "Find the care to support your need",
    },
    {
      name: "searchPlaceholder",
      type: "string",
      defaultValue: "How can we help you today?",
    },
    {
      name: "searchButtonTitle",
      type: "string",
      defaultValue: "Search clinical trials",
    },
    {
      name: "clearSearchButtonTitle",
      type: "string",
      defaultValue: "Clear search",
    },
    {
      name: "refinementSections",
      type: "list",
      defaultValue: [
        {
          title: "Conditions",
          attribute: "protocolSection.conditionsModule.conditions",
        },
        {
          title: "Country",
          attribute:
            "protocolSection.contactsLocationsModule.locations.country",
        },
        {
          title: "City",
          attribute: "protocolSection.contactsLocationsModule.locations.city",
        },
      ],
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "attribute",
          type: "string",
        },
      ],
    },
  ],
  noWrap: true,
});

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

Builder.registerComponent(Module6, {
  name: "Module6",
  inputs: [
    {
      name: "mainHeading",
      type: "string",
      defaultValue: "Knowledge empowers. Action transforms.",
    },
    {
      name: "advocateSection",
      type: "object",
      defaultValue: {
        title: "Advocate",
        description:
          "Your voice matters. Help shape the future of cancer care by advocating for funding, policy changes, and better patient support.",
        statNumber: "10k+",
        statDescription:
          "patients in Georgia have benefited from advocacy-led initiatives.",
        buttonText: "Take action now",
        buttonUrl: "#",
      },
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "statNumber",
          type: "string",
        },
        {
          name: "statDescription",
          type: "string",
        },
        {
          name: "buttonText",
          type: "string",
        },
        {
          name: "buttonUrl",
          type: "string",
        },
      ],
    },
    {
      name: "learnCard",
      type: "object",
      defaultValue: {
        label: "Learn",
        title: "Stay Informed",
        description:
          "Breakthroughs happen every day. Stay informed on the latest cancer research and treatment advancements.",
        linkText: "Read the latest research",
        linkUrl: "#",
      },
      subFields: [
        {
          name: "label",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "linkText",
          type: "string",
        },
        {
          name: "linkUrl",
          type: "string",
        },
      ],
    },
    {
      name: "engageCard",
      type: "object",
      defaultValue: {
        label: "Engage",
        title: "Get Involved",
        description:
          "Join a movement for change. Get involved by attending local events or volunteering in your community.",
        linkText: "Discover upcoming events",
        linkUrl: "#",
      },
      subFields: [
        {
          name: "label",
          type: "string",
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "linkText",
          type: "string",
        },
        {
          name: "linkUrl",
          type: "string",
        },
      ],
    },
    {
      name: "careSection",
      type: "object",
      defaultValue: {
        heading: "Resources for those who care, at home & in the clinic.",
        caregiverCard: {
          label: "for caregivers",
          description:
            "Caring for a loved one? Get access to guidance, financial aid, and support.",
          linkText: "Explore caregiver resources",
          linkUrl: "#",
        },
        providerCard: {
          label: "for providers",
          description:
            "Be part of something bigger. Find clinical trials, access research, and more.",
          linkText: "Explore provider resources",
          linkUrl: "#",
        },
      },
      subFields: [
        {
          name: "heading",
          type: "string",
        },
        {
          name: "caregiverCard",
          type: "object",
          subFields: [
            {
              name: "label",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "linkText",
              type: "string",
            },
            {
              name: "linkUrl",
              type: "string",
            },
          ],
        },
        {
          name: "providerCard",
          type: "object",
          subFields: [
            {
              name: "label",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "linkText",
              type: "string",
            },
            {
              name: "linkUrl",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "object",
      defaultValue: {
        advocateImage:
          "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a?placeholderIfAbsent=true",
        arrowIcon:
          "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b?placeholderIfAbsent=true",
        decorativeImage:
          "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/f93ba7ace2cb8d192b54725c0a0fbd4e24cca342?placeholderIfAbsent=true",
      },
      subFields: [
        {
          name: "advocateImage",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        },
        {
          name: "arrowIcon",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        },
        {
          name: "decorativeImage",
          type: "file",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        },
      ],
    },
  ],
});
