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
  return (
    <button
      className="btn btn-sm mb-8 text-white bg-[#54CE50]"
      disabled={disabled}
      type="button"
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
}
