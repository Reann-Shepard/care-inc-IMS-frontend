'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
}

export default function FormButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <div className="w-96 form-control py-8">
      <button
        disabled={pending}
        className="primary-btn h-11 w-96 rounded-md bg-ochre disabled:cursor-not-allowed"
      >
        {pending ? 'Loading...' : text}
      </button>
    </div>
  );
}
