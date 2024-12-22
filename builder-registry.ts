import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";
import { fileURLToPath } from "url";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("@/components/layout/header")),
  {
    name: "Header",
  }
);

Builder.registerComponent(
  dynamic(() => import("@/components/layout/footer2")),
  {
    name: "Footer",
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
        name: "body",
        type: "html",
        required: true,
        defaultValue: "Default Body",
      },
      {
        name: "image",
        type: "file",
      },
      {
        name: "color",
        friendlyName: "Background color",
        type: "string",
        enum: ["red", "green", "teal"],
        defaultValue: "teal",
      }
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ui/Banner50")),
  {
    name: "Banner50",
    inputs: [
      {
        name: "heading",
        type: "string",
        required: true,
        defaultValue: "Main Heading",
      },
      {
        name: "subheading",
        type: "string",
        required: false,
        defaultValue: "Subheading text",
      },
      {
        name: "bodyText",
        type: "html",
        required: true,
        defaultValue: "Main body text goes here",
      },
      {
        name: "extendedText",
        type: "text",
        defaultValue: "Additional text content",
      },
      {
        name: "imageSrc",
        type: "file",
        required: true,
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      },
      {
        name: "imageAlt",
        type: "string",
        required: true,
        defaultValue: "Banner image",
      },
    ],
  }
);

Builder.register("editor.settings", {
  designTokens: {
    colors: [
      { name: "White", value: "var(--color-primary-light)" },
      { name: "Dark", value: "var(--color-primary-dark)" },
      { name: "Red", value: "var(--color-accent-red)" },
      { name: "Green", value: "var(--color-accent-green)" },
      { name: "Teal", value: "var(--color-accent-teal)" },
    ],
    spacing: [
      { name: "Lg", value: "var(--spacing-lg, 16px)" },
      { name: "Md", value: "var(--spacing-md, 8px)" },
      { name: "Sm", value: "var(--spacing-sm, 4px)" },
      { name: "None", value: "var(--spacing-none, 0px)" },
    ],
    fontFamily: [
      { name: "Primary", value: "var(--font-primary, 'Arial', sans-serif)" },
      {
        name: "Secondary",
        value: "var(--font-secondary, 'Gilroy', sans-serif)",
      },
    ],
    // other design tokens
  },
});
