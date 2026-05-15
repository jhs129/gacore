import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "CTA",
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
    { name: "title", type: "string", defaultValue: "Advocate" },
    {
      name: "description",
      type: "string",
      defaultValue: "Your voice matters. Help shape the future of cancer care by advocating for funding, policy changes, and better patient support.",
    },
    { name: "statNumber", type: "string", defaultValue: "10k+" },
    { name: "statDescription", type: "string", defaultValue: "patients in Georgia have benefited from advocacy-led initiatives." },
    { name: "buttonText", type: "string", defaultValue: "Take action now" },
    { name: "buttonUrl", type: "string", defaultValue: "#" },
    {
      name: "image",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue: "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a",
    },
  ],
});
