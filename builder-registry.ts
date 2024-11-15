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
  styleStrictMode: true, // optional
  designTokens: {
    colors: [
      { name: "surface/secondary/cyan", value: "var(--surface-secondary-cyan, #037E88)" },
      { name: "surface/secondary/azure", value: "var(--surface-secondary-azure-dark, #343A40)" },
      { name: "surface/neutral/light-gray", value: "var(--surface-neutral-light-gray, #F8F9FA)" },
      { name: "surface/primary/green", value: "var(--surface-primary-green, #5B794E)" },
      { name: "text/body-dark", value: "var(--text-body-dark, #000)" },
      { name: "text/body-text-invert", value: "var(--text-body-dark, #FFFFF)" },
      { name: "hyperlink/invert", value: "var(--text-body-dark, #FFFFF)" },
    ],
    spacing: [
      { name: "Large", value: "var(--space-large, 20px)" },
      { name: "Small", value: "var(--space-small, 10px)" },
      { name: "Tiny", value: "5px" },
    ],
    fontFamily: [
      { name: 'Serif Font', value: 'var(--serif-font, Times, serif)' },
      { name: 'Primary Font', value: 'Roboto, sans-serif' },
      { name: 'Secondary Font', value: 'var(--font-font-family-secondary, "Liberation-Sans")' },
    ]
  },
});
