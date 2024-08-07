'use clients';
import React, { useState } from 'react';

interface InputBoxProps {
  label: string;
  placeholder: string;
  isRequired?: boolean;
  value: string;
  // index: number;
}

export default function DeviceDetailsInfo({
  label = '',
  placeholder,
  value,
  // index,
}: InputBoxProps) {
  return (
    <div>
      <p className="text-sm">{label}</p>
      {value?.length > 0 ? (
        <p
          // key={index}
          className="mt-2 mb-8 text-sm input input-bordered w-60 bg-gray-50 flex items-center justify-between"
        >
          {value}
        </p>
      ) : (
        <input
          // key={index}
          type="text"
          placeholder={placeholder}
          value={value}
          disabled
          className="mt-2 mb-8 text-sm input input-bordered w-60"
        />
      )}
    </div>
  );
}
