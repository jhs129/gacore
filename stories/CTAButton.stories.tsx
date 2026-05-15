import type { Meta, StoryObj } from "@storybook/react";
import CTAButton from "../components/ui/CTAButton";

const meta: Meta<typeof CTAButton> = {
  title: "UI/CTAButton",
  component: CTAButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Buy a Plate",
    href: "#",
  },
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const FilledGreen: Story = {
  args: { variant: "filled-green", label: "Donate" },
};

export const OutlinedGreen: Story = {
  args: { variant: "outlined-green", label: "Buy a Plate" },
};

export const OutlinedWhite: Story = {
  args: { variant: "outlined-white", label: "Sign Up" },
  parameters: { backgrounds: { default: "dark" } },
};

export const LinkUnderlined: Story = {
  args: { variant: "link-underlined", label: "View Details" },
};

export const SmallSize: Story = {
  args: { variant: "filled-green", label: "Donate", size: "sm" },
};

export const ExternalLink: Story = {
  args: { variant: "outlined-green", label: "Learn More", external: true },
};

export const AsButton: Story = {
  args: { variant: "filled-green", label: "Submit", href: undefined },
};
