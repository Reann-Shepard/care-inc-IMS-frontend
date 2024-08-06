import React, { useState, useRef, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { createPortal } from 'react-dom';

interface OrderedAtFilterProps {
  onDateRangeSelect: (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const OrderedAtFilter: React.FC<OrderedAtFilterProps> = ({
  onDateRangeSelect,
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom, left: rect.left });
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;
    setState([selection]);
    onDateRangeSelect({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
  };

  return (
    <div className="relative inline-block" ref={buttonRef}>
      <div
        tabIndex={0}
        className="btn btn-ghost btn-sm border border-slate-950 rounded-xl m-1"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FaRegClock /> Ordered At <IoMdArrowDropdown />
      </div>
      {isDropdownOpen &&
        createPortal(
          <div
            className="bg-base-100 rounded-box shadow-md absolute z-[1]"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
            ref={dropdownRef}
          >
            <DateRangePicker
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={state}
              direction="horizontal"
            />
          </div>,
          document.body,
        )}
    </div>
  );
};

export { OrderedAtFilter };
