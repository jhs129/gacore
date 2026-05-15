import dynamic from "next/dynamic";
import { Builder } from "@builder.io/react";

Builder.registerComponent(dynamic(() => import("./index")), {
  name: "MemberApp",
  friendlyName: "Member Application",
  inputs: [],
});
