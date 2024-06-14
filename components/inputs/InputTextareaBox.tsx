'use clients';
import React, { useState } from 'react';

interface InputTextareaBoxProps {
  label: string;
  placeholder: string;
  isRequired?: boolean;
  name: string;
  value?: string | number;
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function InputTextareaBox({
  label,
  placeholder,
  isRequired,
  name,
  value,
  onChangeHandler,
}: InputTextareaBoxProps) {
  return (
    <div>
      <p>
        {label}{' '}
        {isRequired && <span className="font-bold text-red-600">*</span>}
      </p>
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        required={isRequired}
        // rows={2}
        // cols={20}
        className="mt-2 mb-8 p-3 px-4 textarea-sm textarea textarea-bordered resize-none w-full h-20"
      ></textarea>
    </div>
  );
}
