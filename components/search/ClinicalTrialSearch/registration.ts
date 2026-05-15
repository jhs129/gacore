import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "ClinicalTrialSearch",
  inputs: [
    {
      name: "backgroundImage",
      type: "file",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      required: false,
      helperText: "Optional background image for the header section",
    },
    { name: "mainTitle", type: "string", defaultValue: "Your trusted path to clinical trials." },
    { name: "subtitle", type: "string", defaultValue: "Find the care & support you need" },
    { name: "searchPlaceholder", type: "string", defaultValue: "How can we help you today?" },
    { name: "searchButtonTitle", type: "string", defaultValue: "Search clinical trials" },
    { name: "clearSearchButtonTitle", type: "string", defaultValue: "Clear search" },
    {
      name: "refinementSections",
      type: "list",
      defaultValue: [
        { title: "Conditions", attribute: "protocolSection.conditionsModule.conditions" },
        { title: "Country", attribute: "protocolSection.contactsLocationsModule.locations.country" },
        { title: "City", attribute: "protocolSection.contactsLocationsModule.locations.city" },
      ],
      subFields: [
        { name: "title", type: "string" },
        { name: "attribute", type: "string" },
      ],
    },
  ],
  noWrap: true,
});
