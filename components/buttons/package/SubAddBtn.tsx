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

  if (btnName.includes('Add') || btnName.includes('Update')) {
    // color = 'bg-[#54CE50]'; // green
    color = 'btn-success';
  }
  if (btnName.includes('Edit')) {
    // color = 'bg-[#516E9D]'; // blue
    color = 'btn-info';
  }
  if (btnName.includes('Remove')) {
    // color = 'bg-[#EE716E]'; // red
    color = 'btn-secondary';
  }

  return (
    <button
      className={`btn btn-outline btn-sm ${color}`}
      disabled={disabled}
      type="button"
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
}
