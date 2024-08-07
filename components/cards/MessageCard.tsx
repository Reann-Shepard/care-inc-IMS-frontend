import React from 'react';

interface MessageCardProps {
  alertType: string;
  message: string;
}
export default function MessageCard({ alertType, message }: MessageCardProps) {
  let shape = '';
  let color = '';

  if (alertType === 'alert-error') {
    shape =
      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
    color = 'bg-red-200';
  }

  if (alertType === 'alert-warning') {
    shape =
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
    color = 'bg-yellow-100';
  }

  if (alertType === 'alert-success') {
    shape = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    color = 'bg-green-200';
  }

  return (
    <div
      role="alert"
      className={`alert ${alertType} h-3 flex items-center rounded-lg mb-5 ${color}`}
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
