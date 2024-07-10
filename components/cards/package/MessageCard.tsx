import React from 'react';

interface MessageCardProps {
  shape: string;
  alertType: string;
  message: string;
}
export default function MessageCard({
  shape,
  alertType,
  message,
}: MessageCardProps) {
  return (
    <div
      role="alert"
      className={`alert ${alertType} h-3 flex items-center rounded-lg mb-5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={shape}
        />
      </svg>
      <span className="text-xs font-bold">{message}</span>
    </div>
  );
}
