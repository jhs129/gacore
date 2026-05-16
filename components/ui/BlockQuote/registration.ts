import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "BlockQuote",
  inputs: [
    {
      name: "quote",
      type: "longText",
      required: true,
      defaultValue: "Enter your quote text here.",
    },
    {
      name: "attribution",
      type: "string",
      defaultValue: "",
      helperText: "Optional — name or source of the quote",
    },
  ],
});
