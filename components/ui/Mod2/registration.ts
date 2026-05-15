import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "Mod2",
  inputs: [
    {
      name: "heading",
      type: "html",
      defaultValue: "Every cancer journey is unique. We're here to guide you through yours.",
    },
    {
      name: "tabs",
      type: "list",
      subFields: [
        { name: "id", type: "string" },
        { name: "label", type: "string" },
        { name: "isActive", type: "boolean", defaultValue: false },
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
        { name: "iconSrc", type: "string" },
        { name: "text", type: "string" },
        { name: "linkUrl", type: "string" },
      ],
      defaultValue: [
        {
          iconSrc: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/710bb545f70f803b0cc93e61dc89c754cc801b9a?placeholderIfAbsent=true",
          text: "Find a doctor or cancer center near you",
          linkUrl: "#",
        },
        {
          iconSrc: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/afe4e8e029d5037450c728c791a3ef6d55f2d743?placeholderIfAbsent=true",
          text: "Understand your diagnosis & treatment",
          linkUrl: "#",
        },
        {
          iconSrc: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/c3ed767f9c66fdf592499e4a7111bf5f354e8811?placeholderIfAbsent=true",
          text: "Get financial & emotional support",
          linkUrl: "#",
        },
        {
          iconSrc: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/6bcfcbd586711c3127d1e42494d470c1701cbcd2?placeholderIfAbsent=true",
          text: "Explore additionalresources",
          linkUrl: "#",
        },
      ],
    },
    {
      name: "imageSrc",
      type: "string",
      defaultValue: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1fd67c6e443e2ba97e0c14d58120b749616041cf?placeholderIfAbsent=true",
    },
    { name: "imageAlt", type: "string", defaultValue: "Cancer support image" },
  ],
});
