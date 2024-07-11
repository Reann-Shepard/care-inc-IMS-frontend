'use clients';

import React, { useState, useRef, useEffect } from 'react';

interface InputDropdownBoxProps {
  label?: string;
  placeholder: string;
  isRequired?: boolean;
  name: string;
  data?: string[] | number[];
  value?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputDropdownBox({
  label = '',
  placeholder,
  isRequired,
  name,
  data,
  value,
  onChangeHandler,
}: InputDropdownBoxProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [selectedItem, setSelectedItem] = useState<{
    name: string | number;
  } | null>(null);

  const handleSelect = (selection: string | number) => {
    detailsRef.current?.removeAttribute('open');
    setSelectedItem({ name: selection });
    onChangeHandler({
      target: { name: name, value: selection },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    document.addEventListener('click', () => {
      detailsRef.current?.removeAttribute('open');
    });
  }, []);

  return (
    <div>
      <p className="text-sm">
        {label ? label : name}{' '}
        {isRequired && <span className="font-bold text-red-600">*</span>}
      </p>
      <details ref={detailsRef} className="dropdown mt-2 mb-8 text-sm">
        <summary className="select input input-bordered btn w-60 justify-between font-normal text-sm">
          <input
            placeholder={placeholder}
            name={name}
            value={value || ''}
            onChange={onChangeHandler}
            readOnly
          />
        </summary>
        <ul className="dropdown-content z-[1] menu w-60 text-xs shadow bg-base-100 rounded-box">
          {data &&
            data.map((item) => (
              <li
                key={item}
                className="dropdown-item"
                onClick={() => handleSelect(item)}
              >
                <a>{item}</a>
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
}
