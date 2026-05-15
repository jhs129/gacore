import type { Meta, StoryObj } from "@storybook/react";
import EventCardVertical from "../components/ui/EventCardVertical";

const meta: Meta<typeof EventCardVertical> = {
  title: "UI/EventCardVertical",
  component: EventCardVertical,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    eventType: "Conference",
    title: "GASCO-GAP Joint Lung Cancer Precision Medicine Update",
    dateTime: "Sat, May 17 | 8:30 AM - 2:45 PM",
    location: "Atlanta, GA",
    imageUrl:
      "https://placehold.co/72x72.png",
    imageAlt: "Event thumbnail",
    href: "#",
  },
};

export default meta;
type Story = StoryObj<typeof EventCardVertical>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title:
      "Annual Georgia Oncology Symposium: Advances in Precision Medicine, Immunotherapy and Patient-Centered Care in 2025",
  },
};

export const NoImage: Story = {
  args: {
    imageUrl: undefined,
    imageAlt: undefined,
  },
};

export const ShortLocation: Story = {
  args: {
    location: "GA",
  },
};
