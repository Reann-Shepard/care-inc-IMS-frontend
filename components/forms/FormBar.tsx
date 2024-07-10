import React from 'react';

interface formBarProps {
  title: string;
}

export default function FormBar({ title }: formBarProps) {
  return (
    <div>
      <div className="w-full h-8 text-sm my-5 bg-gray-200 font-bold flex justify-center items-center">
        {title}
      </div>
    </div>
  );
}
