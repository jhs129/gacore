import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "CancerCareHero",
  inputs: [
    { name: "tagline", type: "string", defaultValue: "Stronger together:" },
    { name: "title", type: "string", defaultValue: "Your trusted path to cancer care in Georgia." },
    { name: "searchTitle", type: "string", defaultValue: "Find the care & support you need" },
    {
      name: "heroImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      defaultValue: "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1100317535e68237decbddcd2d241bfa1e1d98c9",
    },
    { name: "heroImageAlt", type: "string", defaultValue: "Healthcare professionals providing cancer care" },
  ],
});
