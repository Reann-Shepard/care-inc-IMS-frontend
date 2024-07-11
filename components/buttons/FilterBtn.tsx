'use clients';
import React, { useEffect, useRef, useState } from 'react';
import { set } from 'zod';

interface FilterBtnProps {
  dataColumnIndexes: number[];
  dataColumnNames: string[];
  calendarRowIndex?: number[];
  data?: (string | number | Date | null)[][];
  fittingDateFilterValue: string;
  onFittingDateFilter: (value: string) => void;
  onFilter: (selectedBoxed: { [key: string]: (string | number)[] }) => void;
}

export default function FilterBtn({
  dataColumnIndexes,
  dataColumnNames,
  calendarRowIndex,
  data,
  fittingDateFilterValue,
  onFittingDateFilter,
  onFilter,
}: FilterBtnProps) {
  const filterRef = useRef<HTMLDetailsElement>(null);
  const [selectedBoxes, setSelectedBoxes] = useState<{
    [key: string]: (string | number)[];
  }>({});

  //for fitting Date Month or Date
  const [activeTab, setActiveTab] = useState<'month' | 'date'>('month');

  const getUniqueData = (index: number) => {
    return Array.from(new Set(data?.map((eachPackage) => eachPackage[index])));
  };
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

      if (calendarRowIndex?.includes(dataColumnNames.indexOf(column))) {
        onFilter({
          ...selectedBoxes,
          [column]: [fittingDateFilterValue],
        });
      } else {
        onFilter(selectedBoxes);
      }
      return selectedBoxes;
    });
  };

  // for calendar filter
  const handleFittingDateFilter = (value: string) => {
    onFittingDateFilter(value);
    handleFilterBoxes(dataColumnNames[2], value);
  };

  // for filter list to close when clicked outside
  useEffect(() => {
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
  }, []);

  return (
    <div className="flex items-center text-xs">
      <div className="text-xs">Filter By:</div>
      <details ref={filterRef} className="dropdown dropdown-hover rounded-lg">
        <summary className="m-2 pr-7 btn btn-xs select">Filter</summary>
        <div className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
          <ul>
            {dataColumnIndexes.map((colIndex, titleIndex) => (
              <li key={titleIndex} className="w-[500px] text-xs">
                <div className="border-t-2">
                  <div className="w-20 mr-4">
                    <a>{dataColumnNames[titleIndex]}</a>
                  </div>
                  <div className="flex flex-wrap">
                    {calendarRowIndex?.includes(colIndex) ? (
                      <div className="flex gap-3 items-center">
                        <div
                          role="tablist"
                          className="tabs tabs-boxed tabs-xs text-xs"
                        >
                          <a
                            role="tab"
                            className={`tab text-xs ${activeTab == 'month' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('month')}
                          >
                            Month
                          </a>
                          <a
                            role="tab"
                            className={`tab text-xs ${activeTab == 'date' ? 'tab-active' : ''}`}
                            onClick={() => setActiveTab('date')}
                          >
                            Date
                          </a>
                        </div>
                        <label className="flex flex-wrap">
                          <input
                            type={activeTab}
                            onChange={(e) => {
                              handleFittingDateFilter(e.target.value);
                              handleFilterBoxes(
                                dataColumnNames[titleIndex],
                                e.target.value,
                              );
                            }}
                            className="border border-gray-300 rounded-md p-1 text-xs"
                            value={fittingDateFilterValue}
                          />
                        </label>
                      </div>
                    ) : (
                      dataUniqueByTitle[titleIndex].map((name, nameIndex) => (
                        <label key={nameIndex} className="flex flex-wrap w-20">
                          <input
                            type="checkbox"
                            value={name as string}
                            onChange={() => {
                              handleFilterBoxes(
                                dataColumnNames[titleIndex],
                                name as string,
                              );
                            }}
                            checked={
                              selectedBoxes[
                                dataColumnNames[titleIndex]
                              ]?.includes(name as string) || false
                            }
                          />
                          <span className="ml-2">{String(name)}</span>
                        </label>
                      ))
                    )}
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
