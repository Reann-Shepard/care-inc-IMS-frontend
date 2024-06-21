'use client';
import React, { useState, useRef, useEffect } from 'react';

interface SortByBtnProps {
  dataColumnTitles: string[]; // for display
  dataColumnNames: string[]; // for database column names
  value: string;
  onSortBy: (sortBy: string) => void;
}

export default function SortByBtn({
  dataColumnTitles,
  dataColumnNames,
  value,
  onSortBy,
}: SortByBtnProps) {
  const sortByRef = useRef<HTMLDetailsElement>(null);

  const handleSortBy = (sortBy: string) => {
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
            {dataColumnTitles.map((item, index) => (
              <li
                key={item}
                onClick={() => handleSortBy(dataColumnNames[index])}
              >
                <a>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
