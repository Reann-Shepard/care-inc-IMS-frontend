'use clients';
import React, { useEffect, useRef, useState } from 'react';

interface FilterBtnProps {
  // dataColumnTitle: string[];
  dataColumnIndexes: number[];
  dataColumnNames: string[];
  data?: (string | number | Date | null)[][];
  onFilter: (selectedBoxed: { [key: string]: (string | number)[] }) => void;
}

export default function FilterBtn({
  // dataColumnTitle,
  dataColumnIndexes,
  dataColumnNames,
  data,
  onFilter,
}: FilterBtnProps) {
  const filterRef = useRef<HTMLDetailsElement>(null);
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

    function handleClickOutside(event: any) {
      // or can be only MouseEvent
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        filterRef.current.removeAttribute('open');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedBoxes]);

  return (
    <div className="flex items-center">
      <div className="text-xs">Filter By:</div>
      <details ref={filterRef} className="dropdown dropdown-hover rounded-lg">
        <summary className="m-2 pr-7 btn btn-xs select">Filter</summary>
        <div className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
          <ul>
            {dataColumnIndexes.map((colIndex, titleIndex) => (
              <li key={titleIndex} className="w-[520px]">
                <div className="border-t-2">
                  <a className="w-20 mr-4">{dataColumnNames[titleIndex]}</a>
                  <div className="flex flex-wrap">
                    {dataUniqueByTitle[titleIndex].map((name, nameIndex) => (
                      <label key={nameIndex} className="flex flex-wrap w-24">
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
