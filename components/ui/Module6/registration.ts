import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "Module6",
  inputs: [
    { name: "mainHeading", type: "string", defaultValue: "Knowledge empowers. Action transforms." },
    {
      name: "advocateSection",
      type: "object",
      defaultValue: {
        title: "Advocate",
        description: "Your voice matters. Help shape the future of cancer care by advocating for funding, policy changes, and better patient support.",
        statNumber: "10k+",
        statDescription: "patients in Georgia have benefited from advocacy-led initiatives.",
        buttonText: "Take action now",
        buttonUrl: "#",
      },
      subFields: [
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "statNumber", type: "string" },
        { name: "statDescription", type: "string" },
        { name: "buttonText", type: "string" },
        { name: "buttonUrl", type: "string" },
      ],
    },
    {
      name: "learnCard",
      type: "object",
      defaultValue: {
        label: "Learn",
        title: "Stay Informed",
        description: "Breakthroughs happen every day. Stay informed on the latest cancer research and treatment advancements.",
        linkText: "Read the latest research",
        linkUrl: "#",
      },
      subFields: [
        { name: "label", type: "string" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "linkText", type: "string" },
        { name: "linkUrl", type: "string" },
      ],
    },
    {
      name: "engageCard",
      type: "object",
      defaultValue: {
        label: "Engage",
        title: "Get Involved",
        description: "Join a movement for change. Get involved by attending local events or volunteering in your community.",
        linkText: "Discover upcoming events",
        linkUrl: "#",
      },
      subFields: [
        { name: "label", type: "string" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "linkText", type: "string" },
        { name: "linkUrl", type: "string" },
      ],
    },
    {
      name: "careSection",
      type: "object",
      defaultValue: {
        heading: "Resources for those who care, at home & in the clinic.",
        caregiverCard: {
          label: "for caregivers",
          description: "Caring for a loved one? Get access to guidance, financial aid, and support.",
          linkText: "Explore caregiver resources",
          linkUrl: "#",
        },
        providerCard: {
          label: "for providers",
          description: "Be part of something bigger. Find clinical trials, access research, and more.",
          linkText: "Explore provider resources",
          linkUrl: "#",
        },
      },
      subFields: [
        { name: "heading", type: "string" },
        {
          name: "caregiverCard",
          type: "object",
          subFields: [
            { name: "label", type: "string" },
            { name: "description", type: "string" },
            { name: "linkText", type: "string" },
            { name: "linkUrl", type: "string" },
          ],
        },
        {
          name: "providerCard",
          type: "object",
          subFields: [
            { name: "label", type: "string" },
            { name: "description", type: "string" },
            { name: "linkText", type: "string" },
            { name: "linkUrl", type: "string" },
          ],
        },
      ],
    },
    {
      name: "images",
      type: "object",
      defaultValue: {
        advocateImage: "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a?placeholderIfAbsent=true",
        arrowIcon: "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b?placeholderIfAbsent=true",
        decorativeImage: "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/f93ba7ace2cb8d192b54725c0a0fbd4e24cca342?placeholderIfAbsent=true",
      },
      subFields: [
        { name: "advocateImage", type: "file", allowedFileTypes: ["jpeg", "jpg", "png", "svg"] },
        { name: "arrowIcon", type: "file", allowedFileTypes: ["jpeg", "jpg", "png", "svg"] },
        { name: "decorativeImage", type: "file", allowedFileTypes: ["jpeg", "jpg", "png", "svg"] },
      ],
    },
  ],
});
