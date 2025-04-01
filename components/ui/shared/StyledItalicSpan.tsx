import React from "react";

interface StyledItalicSpanProps {
  children: React.ReactNode;
  className?: string;
}

export const StyledItalicSpan: React.FC<StyledItalicSpanProps> = ({
  children,
  className = "",
}) => (
  <span className={`italic relative ${className}`}>
    {children}
    <img
      src="https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/f93ba7ace2cb8d192b54725c0a0fbd4e24cca342"
      alt=""
      className="absolute left-0 -bottom-2 w-full"
    />
  </span>
);

export default StyledItalicSpan;
