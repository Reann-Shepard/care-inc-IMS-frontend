'use clients';
import { title } from 'process';
import React, { useState } from 'react';

interface FilterBtnProps {
  dataTitle: string[];
  data: string[][];
}

export default function FilterBtn({ dataTitle, data }: FilterBtnProps) {
  const getUniqueData = (index: number) => {
    return Array.from(new Set(data.map((eachPackage) => eachPackage[index])));
  };
  const dataUniqueByTitle = dataTitle.map((title, index) =>
    getUniqueData(index),
  );

  return (
    <div className="flex items-center">
      <div className="text-xs ml-5 mr-2">Filter: </div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn btn-xs m-1 px-7">
          filter
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] bg-base-100 shadow rounded-box "
        >
          {dataTitle.map((title, index) => (
            <li key={index}>
              <div>
                <a className="w-20">{title}</a>
                {dataUniqueByTitle[index].map((name, index) => (
                  <label key={index} className="flex w-36">
                    <input
                      type="checkbox"
                      value={name}
                      // onChange={handleFilterBoxes}
                    />
                    <span className="ml-2">{name}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
