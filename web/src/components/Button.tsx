import React from "react";

interface ButtonProps {
  svg: React.ReactNode;
  text: string;
  style: string;
}

export function Button({ svg, text, style }: ButtonProps) {
  return (
    <button className={style}>
      <span>
        {svg}
      </span>
      {text}
    </button>
  )
}