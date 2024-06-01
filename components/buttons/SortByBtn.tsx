'use client';
import React, { useState, useRef, useEffect } from 'react';

interface SortByBtnProps {
  dataColumnName: string[];
  value: string;
  // data?: T[];
  // onClick: () => void;
  onSortBy: (sortBy: string) => void;
}

export default function SortByBtn({
  dataColumnName,
  value,
  onSortBy,
}: SortByBtnProps) {
  const sortByRef = useRef<HTMLDetailsElement>(null);
  // const [sortBy, setSortBy] = useState<string>(dataColumnName[0]);
  // const [sortByTitle, setSortByTitle] = useState<string>(dataColumnName[0].charAt(0).toUpperCase() + dataColumnName[0].slice(1));

  const handleSortBy = (sortBy: string) => {
    // setSortBy(sortBy);
    // const sortBy_title = sortBy.charAt(0).toUpperCase() + sortBy.slice(1);
    // setSortByTitle(sortBy_title);
    sortByRef.current?.removeAttribute('open');
    onSortBy(sortBy);
  };

  return (
    <div className="flex items-center">
      <div className="text-xs">Sort By: </div>
      <details ref={sortByRef} className="dropdown dropdown-hover rounded-lg">
        <summary className="m-2 pr-7 btn btn-xs select">{value}</summary>
        <div className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <ul>
            {dataColumnName.map((item) => (
              <li key={item} onClick={() => handleSortBy(item)}>
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
