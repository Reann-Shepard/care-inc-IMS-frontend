'use clients';
import React, { useEffect, useState } from 'react';

interface FilterBtnProps {
  dataColumnTitle: string[];
  dataColumnName: string[];
  data: string[][];
  onFilter: (selectedBoxed: { [key: string]: string[] }) => void;
}

export default function FilterBtn({
  dataColumnTitle,
  dataColumnName,
  data,
  onFilter,
}: FilterBtnProps) {
  const [selectedBoxes, setSelectedBoxes] = useState<{
    [key: string]: string[];
  }>({});
  const getUniqueData = (index: number) => {
    return Array.from(new Set(data.map((eachPackage) => eachPackage[index])));
  };
  const dataUniqueByTitle = dataColumnTitle.map((title, index) =>
    getUniqueData(index),
  );
  // get selectedboxes based on their dataTitle
  const handleFilterBoxes = (column: string, name: string) => {
    setSelectedBoxes((prev) => {
      const prevSelectedBoxes = prev[column] || [];
      const newSelectedBoxes = prevSelectedBoxes.includes(name)
        ? prevSelectedBoxes.filter((selected) => selected !== name)
        : [...prevSelectedBoxes, name];
      const selectedBoxes = { ...prev, [column]: newSelectedBoxes };
      // const selectedBoxes = { ...newSelectedBoxes };

      onFilter(selectedBoxes);
      return selectedBoxes;
    });
  };
  useEffect(() => {
    console.log(selectedBoxes);
  }, [selectedBoxes]);

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
          {dataColumnTitle.map((title, titleIndex) => (
            <li key={titleIndex}>
              <div>
                <a className="w-20">{title}</a>
                {dataUniqueByTitle[titleIndex].map((name, index) => (
                  <label key={index} className="flex w-36">
                    <input
                      type="checkbox"
                      value={name}
                      onClick={() => {
                        handleFilterBoxes(dataColumnName[titleIndex], name);
                      }}
                      checked={selectedBoxes[
                        dataColumnName[titleIndex]
                      ]?.includes(name)}
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
