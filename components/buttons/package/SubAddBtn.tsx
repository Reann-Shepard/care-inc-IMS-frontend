import { color } from 'framer-motion';
import React from 'react';

interface SubAddBtnProps {
  btnName: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export default function SubAddBtn({
  btnName,
  disabled,
  handleClick,
}: SubAddBtnProps) {
  let color = '';

  if (btnName.includes('Add')) {
    color = 'bg-[#54CE50]'; // green
  }
  if (btnName.includes('Edit')) {
    color = 'bg-[#516E9D]'; // blue
  }
  if (btnName.includes('Remove')) {
    color = 'bg-[#EE716E]'; // red
  }

  return (
    <button
      className={`btn btn-sm mb-8 text-white ${color}`}
      disabled={disabled}
      type="button"
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
}
