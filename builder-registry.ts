"use client";
import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";



builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("@/components/layout/header")),
  {
    name: "Header",
  }
);

Builder.registerComponent(
  dynamic(() => import("@/components/layout/footer")),
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

Builder.registerComponent(
  dynamic(() => import("./components/ui/GeorgiaCancerCardComponent")),
  {
    name: "GeorgiaCancerCard",
    inputs: [
      {
        name: "headerTitle",
        type: "string",
        defaultValue: "Research Initiatives",
      },
      {
        name: "headerSubtitle",
        type: "string",
        defaultValue: "Georgia CORE",
      },
      {
        name: "imageSrc",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      },
      {
        name: "imageAlt",
        type: "string",
        defaultValue: "Cancer research image",
      },
      {
        name: "contentTitle",
        type: "string",
        defaultValue: "Cancer Research",
      },
      {
        name: "contentSubtitle",
        type: "string",
        defaultValue: "Innovative Approaches",
      },
      {
        name: "contentDescription",
        type: "text",
        defaultValue: "Supporting groundbreaking cancer research initiatives across Georgia to improve patient outcomes.",
      },
      {
        name: "buttonText",
        type: "string",
        defaultValue: "Learn More",
      }
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ui/CancerCareHero")),
  {
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
        required: true,
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
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
        required: true,
      },
      {
        name: "heroImageAlt",
        type: "string",
        defaultValue: "Healthcare professionals providing cancer care",
      },
    ],
  }
);

Builder.register("editor.settings", {
  designTokens: {
    colors: [
      { name: "White", value: "var(--color-primary-light)" },
      { name: "Dark", value: "var(--color-primary-dark)" },
      { name: "Light", value: "var(--color-secondary-light)" },
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
