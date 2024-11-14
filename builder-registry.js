import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(
  dynamic(() => import("@/components/ui/Button")),
  {
    name: "My Button",
    //    image, headline, subheadline, blurb
    inputs: [
      { name: "text", type: "string", defaultValue: "[text]" },
      { name: "target", type: "string", defaultValue: "#" },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
  }
);
