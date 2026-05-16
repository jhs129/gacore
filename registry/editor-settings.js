import { Builder } from "@builder.io/react";

Builder.register("editor.settings", {
  designTokens: {
    colors: [
      { name: "PrimaryLight", value: "var(--color-primary-light, #ffffff)" },
      { name: "SecondaryLight", value: "var(--color-secondary-light, #faf2ed)" },
      { name: "PrimaryDark", value: "var(--color-primary-dark, #302f2e)" },
      { name: "SecondaryDark", value: "var(--color-secondary-dark, #302f2e)" },
      { name: "AccentGreen", value: "var(--color-accent-green, #35755f)" },
      { name: "LightGreen", value: "var(--color-light-green, #eff7f5)" },
      { name: "Orange", value: "var(--color-orange, #F9A77E)" },
      { name: "Peach", value: "var(--color-peach, #FEF2EC)" },
    ],
    fontFamily: [
      { name: "Primary", value: "var(--font-primary, 'PT Sans', sans-serif)" },
      { name: "Secondary", value: "var(--font-secondary, 'Open Sans', sans-serif)" },
    ],
    fontSize: [
      { name: "10", value: "var(--size-10, 12px)" },
      { name: "20", value: "var(--size-20, 14px)" },
      { name: "30", value: "var(--size-30, 16px)" },
      { name: "40", value: "var(--size-40, 18px)" },
      { name: "50", value: "var(--size-50, 20px)" },
      { name: "60", value: "var(--size-60, 24px)" },
      { name: "70", value: "var(--size-70, 36px)" },
      { name: "80", value: "var(--size-80, 48px)" },
    ],
    lineHeight: [
      { name: "10", value: "var(--height-10, 16px)" },
      { name: "20", value: "var(--height-20, 20px)" },
      { name: "30", value: "var(--height-30, 24px)" },
      { name: "40", value: "var(--height-40, 28px)" },
      { name: "50", value: "var(--height-50, 32px)" },
      { name: "60", value: "var(--height-60, 36px)" },
      { name: "70", value: "var(--height-70, 48px)" },
      { name: "80", value: "var(--height-80, 60px)" },
    ],
  },
});


const spacing = [
  { name: "3xl", value: "var(--spacing-xl, 96px)" },
  { name: "2xl", value: "var(--spacing-xl, 64px)" },
  { name: "xl", value: "var(--spacing-xl, 32px)" },
  { name: "lg", value: "var(--spacing-lg, 16px)" },
  { name: "md", value: "var(--spacing-md, 8px)" },
  { name: "sm", value: "var(--spacing-sm, 4px)" },
  { name: "xs", value: "var(--spacing-xs, 4px)" },
  { name: "none", value: "var(--spacing-none, 0px)" },
];