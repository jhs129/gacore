import type { Meta, StoryObj } from "@storybook/react";
import BlockQuote from "./index";

const meta: Meta<typeof BlockQuote> = {
  title: "UI/BlockQuote",
  component: BlockQuote,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    quote:
      "Lorem ipsum dolor sit amet consectetur. Quis mauris purus faucibus non amet. Vitae ornare tincidunt pharetra mi ullamcorper a placerat sodales at.",
    attribution: "— Cancer survivor, Albany, GA",
  },
};

export default meta;
type Story = StoryObj<typeof BlockQuote>;

export const Default: Story = {};

export const NoAttribution: Story = {
  args: { attribution: undefined },
};
