'use clients';
import React, { useEffect, useState } from 'react';

interface FilterBtnProps {
  // dataColumnTitle: string[];
  dataColumnIndexes: number[];
  dataColumnNames: string[];
  data?: (string | number | Date | null)[][];
  onFilter: (selectedBoxed: { [key: string]: string[] }) => void;
}

export default function FilterBtn({
  // dataColumnTitle,
  dataColumnIndexes,
  dataColumnNames,
  data,
  onFilter,
}: FilterBtnProps) {
  const [selectedBoxes, setSelectedBoxes] = useState<{
    [key: string]: string[];
  }>({});
  const getUniqueData = (index: number) => {
    return Array.from(new Set(data?.map((eachPackage) => eachPackage[index])));
  };
  // const dataUniqueByTitle = dataColumnTitle.map((title, index) =>
  const dataUniqueByTitle = dataColumnIndexes.map((index) =>
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
          {dataColumnIndexes.map((colIndex, titleIndex) => (
            <li key={titleIndex}>
              <div>
                <a className="w-20">{dataColumnNames[titleIndex]}</a>
                {dataUniqueByTitle[titleIndex].map((name, nameIndex) => (
                  <label key={nameIndex} className="flex w-36">
                    <input
                      type="checkbox"
                      value={name as string}
                      onClick={() => {
                        handleFilterBoxes(
                          dataColumnNames[titleIndex],
                          name as string,
                        );
                      }}
                      checked={selectedBoxes[
                        dataColumnNames[titleIndex]
                      ]?.includes(name as string)}
                    />
                    <span className="ml-2">{String(name)}</span>
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
