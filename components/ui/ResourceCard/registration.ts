import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "ResourceCard",
  friendlyName: "Card",
  inputs: [
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
    { name: "label", type: "string", defaultValue: "Label", required: true },
    { name: "title", type: "string", defaultValue: "Title" },
    {
      name: "description",
      type: "string",
      defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      required: true,
    },
    { name: "linkText", type: "string", defaultValue: "Learn more", required: true },
    { name: "linkUrl", type: "string", defaultValue: "#" },
  ],
});
