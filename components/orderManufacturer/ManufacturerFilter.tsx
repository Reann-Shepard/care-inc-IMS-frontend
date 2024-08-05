import React, { useState, useEffect } from 'react';
import { MdOutlineFactory } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { fetchOptions } from '@/libs/fetch-options';

interface ManufacturerFilterProps {
  onManufacturerSelect: (
    manufacturer: { value: number; label: string } | null,
  ) => void;
}

const ManufacturerFilter: React.FC<ManufacturerFilterProps> = ({
  onManufacturerSelect,
}) => {
  const [manufacturerOptions, setManufacturerOptions] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { manufacturerOptions } = await fetchOptions();
      setManufacturerOptions(manufacturerOptions);
    };

    fetchData();
  }, []);

  return (
    <div className="dropdown inline-block">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm border border-slate-950 rounded-xl m-1 flex items-center"
      >
        <MdOutlineFactory className="mr-2" /> Manufacturer{' '}
        <IoMdArrowDropdown className="ml-2" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm bg-base-100 rounded-box z-[1] w-52 p-2 shadow absolute"
      >
        {manufacturerOptions.map((manufacturer) => (
          <li
            key={manufacturer.value}
            onClick={() => onManufacturerSelect(manufacturer)}
          >
            <a>{manufacturer.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ManufacturerFilter };
