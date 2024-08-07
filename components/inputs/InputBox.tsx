'use clients';
import React, { useState } from 'react';

interface InputBoxProps {
  type?: string;
  label?: string;
  placeholder: string;
  isRequired?: boolean;
  name: string;
  value?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  type = '',
  label = '',
  placeholder,
  isRequired,
  name,
  value,
  onChangeHandler,
}: InputBoxProps) {
  return (
    <div>
      <p className="text-sm">
        {label ? label : name}{' '}
        {isRequired && <span className="font-bold text-red-600">*</span>}
      </p>
      <input
        type={type ? type : 'text'}
        placeholder={placeholder}
        name={name}
        value={value || ''}
        onChange={onChangeHandler}
        required={isRequired}
        className="mt-2 mb-8 text-sm input input-bordered w-60"
      />
    </div>
  );
}
