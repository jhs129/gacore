import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "EventCardVertical",
  friendlyName: "Event Card (Vertical)",
  inputs: [
    { name: "eventType", type: "string", defaultValue: "Conference", required: true },
    { name: "title", type: "string", defaultValue: "Event Title", required: true },
    { name: "dateTime", type: "string", defaultValue: "Sat, May 17 | 8:30 AM - 2:45 PM", required: true },
    { name: "location", type: "string", defaultValue: "Atlanta, GA", required: true },
    {
      name: "imageUrl",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
      required: false,
      helperText: "Optional circular event image (72x72). If omitted, a placeholder circle is shown.",
    },
    { name: "imageAlt", type: "string", defaultValue: "", required: false, helperText: "Descriptive alt text for the event image" },
    { name: "href", type: "string", required: true, helperText: "URL of the event detail page" },
  ],
});
