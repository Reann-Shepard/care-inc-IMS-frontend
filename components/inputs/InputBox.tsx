'use clients';
import React, { useState } from 'react';

interface InputBoxProps {
  placeholder: string;
  isRequired?: boolean;
  name: string;
  value?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  placeholder,
  isRequired,
  name,
  value,
  onChangeHandler,
}: InputBoxProps) {
  const title = name[0].toUpperCase() + name.slice(1);

  return (
    <div>
      <p>
        {title}{' '}
        {isRequired && <span className="font-bold text-red-600">*</span>}
      </p>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        required={isRequired}
        className="mt-2 mb-8 text-sm input input-bordered w-80"
      />
    </div>
  );
}
