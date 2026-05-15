import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "Support Resources",
  inputs: [
    {
      name: "backgroundImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/8b87078e14ad05d684ddddf38f1c7414c9a662f7?placeholderIfAbsent=true",
    },
    {
      name: "heading",
      type: "string",
      defaultValue: "Cancer impacts more than your health. We're here to connect you to resources that support your whole journey.",
    },
    { name: "buttonText", type: "string", defaultValue: "View all support resources" },
    { name: "buttonUrl", type: "string", defaultValue: "#" },
    {
      name: "cards",
      type: "list",
      defaultValue: [
        {
          iconType: "financial",
          title: "Financial Relief",
          description: "Cost should never be a barrier to care. Find programs that can help ease the financial burden of cancer treatment.",
          linkText: "Explore financial assistance",
          linkUrl: "#",
        },
        {
          iconType: "emotional",
          title: "Emotional Support",
          description: "You are not alone. Connect with people who understand and find support along the way.",
          linkText: "Find a support group",
          linkUrl: "#",
        },
        {
          iconType: "practical",
          title: "Practical help",
          description: "From transportation to housing, we help you focus on healing by connecting you to essential services.",
          linkText: "Get practical assistance",
          linkUrl: "#",
        },
      ],
      subFields: [
        { name: "iconType", type: "string", enum: ["financial", "emotional", "practical"], defaultValue: "financial" },
        { name: "title", type: "string", defaultValue: "Support Card Title" },
        { name: "description", type: "richText", defaultValue: "Description of the support resource" },
        { name: "linkText", type: "string", defaultValue: "Learn more" },
        { name: "linkUrl", type: "string", defaultValue: "#" },
      ],
    },
  ],
});
