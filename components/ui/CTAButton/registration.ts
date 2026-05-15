import { Builder } from "@builder.io/react";
import CTAButton from "./index";

Builder.registerComponent(CTAButton, {
  name: "CTAButton",
  friendlyName: "CTA Button",
  inputs: [
    {
      name: "label",
      type: "string",
      defaultValue: "Learn More",
      required: true,
    },
    {
      name: "href",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "variant",
      type: "string",
      defaultValue: "filled-green",
      enum: [
        { label: "Filled Green", value: "filled-green" },
        { label: "Outlined Green", value: "outlined-green" },
        { label: "Outlined White", value: "outlined-white" },
        { label: "Link Underlined", value: "link-underlined" },
      ],
    },
    {
      name: "size",
      type: "string",
      defaultValue: "md",
      enum: [
        { label: "Medium", value: "md" },
        { label: "Small", value: "sm" },
      ],
    },
    {
      name: "external",
      type: "boolean",
      defaultValue: false,
      helperText: "Opens link in a new tab",
    },
  ],
});
