"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: number; // اندازه دایره اسپینر به px
  color?: string; // رنگ اسپینر
  text?: string; // متن پایین اسپینر
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 16,
  color = "text-blue-500",
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* دایره اسپینر ساده */}
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-t-transparent ${color}`}
        style={{ width: size, height: size }}
      ></div>
      {/* متن پایین اسپینر */}
      {text && <span className="text-gray-600 font-medium">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
