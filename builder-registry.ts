import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("./components/layout/header")),
  {
    name: "Header"
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/layout/footer")),
  {
    name: "Footer"
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ui/logo")),
  {
    name: "Logo",
    inputs: [
      {
        name: "image",
        type: "file",
      },
      {
        name: "alt",
        type: "string",
        required: true,
      },
    ],
  }
);


Builder.registerComponent(
  dynamic(() => import("./components/ui/hero")),
  {
    name: "Hero",
    inputs: [
      {
        name: "image",
        type: "string",
      },
      {
        name: "subtitle",
        type: "string",
        required: true,
      },
      {
        name: "title",
        type: "string",
        required: true,
      },
    ],
  }
);


Builder.register("editor.settings", {
  designTokens: {
    colors: [
      { name: "White", value: "var(--color-primary-light, #FFFFFF)" },
      { name: "Dark", value: "var(--color-primary-dark, #FFFFFF)" },
      { name: "Red", value: "var(--color-accent-red, #FFFFFF)" },
      { name: "Green", value: "var(--color-accent-green, #FFFFFF)" },
      { name: "Teal", value: "var(--color-accent-teal, #FFFFFF)" },
    ],
    spacing: [
      { name: "Lg", value: "var(--spacing-lg, 16px)" },
      { name: "Md", value: "var(--spacing-md, 8px)" },
      { name: "Sm", value: "var(--spacing-sm, 4px)" },
    ],
    fontFamily: [
      { name: 'Primary', value: "var(--font-primary, 'Arial', sans-serif)" },
      { name: 'Secondary', value: "var(--font-secondary, 'Gilroy', sans-serif)" },
    ]
    // other design tokens
  },
});



