'use clients';
import React, { useEffect, useRef, useState } from 'react';
import { set } from 'zod';

interface FilterBtnProps {
  dataColumnIndexes: number[];
  dataColumnNames: string[];
  calendarRowIndex?: number[];
  data?: (string | number | Date | null)[][];
  onFilter: (selectedBoxed: { [key: string]: (string | number)[] }) => void;
}

export default function FilterBtn({
  dataColumnIndexes,
  dataColumnNames,
  calendarRowIndex,
  data,
  onFilter,
}: FilterBtnProps) {
  const filterRef = useRef<HTMLDetailsElement>(null);
  const [selectedBoxes, setSelectedBoxes] = useState<{
    [key: string]: (string | number)[];
  }>({});
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [range, setRange] = useState<boolean>(false);

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
          [column]: [startDate, endDate],
        });
      } else {
        onFilter(selectedBoxes);
      }
      return selectedBoxes;
    });
  };

  // for calendar filter
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisStartDate = e.target.value;
    setStartDate(thisStartDate);
    if (!range) {
      setEndDate(thisStartDate);
    }
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thisEndDate = e.target.value;
    if (thisEndDate < startDate) {
      alert('End date must be later than start date');
      setEndDate(startDate);
    } else {
      setEndDate(thisEndDate);
    }
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
    <div className="flex items-center">
      <div className="text-xs">Filter By:</div>
      <details ref={filterRef} className="dropdown dropdown-hover rounded-lg">
        <summary className="m-2 pr-7 btn btn-xs select">Filter</summary>
        <div className="shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
          <ul>
            {dataColumnIndexes.map((colIndex, titleIndex) => (
              <li key={titleIndex} className="w-[550px]">
                <div className="border-t-2">
                  <a className="w-20 mr-4">{dataColumnNames[titleIndex]}</a>
                  <div className="flex flex-wrap">
                    {calendarRowIndex?.includes(colIndex) ? (
                      <div className="flex gap-3 items-center">
                        <label className="flex flex-wrap">
                          <input
                            type="date"
                            onChange={(e) => {
                              setStartDate(e.target.value);
                              handleFilterBoxes(
                                dataColumnNames[titleIndex],
                                e.target.value,
                              );
                            }}
                            value={startDate}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </label>
                        <span>-</span>
                        <label className="flex flex-wrap">
                          <input
                            type="date"
                            onChange={(e) => {
                              setEndDate(startDate);
                              handleFilterBoxes(
                                dataColumnNames[titleIndex],
                                e.target.value,
                              );
                            }}
                            value={endDate}
                            disabled={!range}
                            className="border border-gray-300 rounded-md p-1"
                          />
                        </label>
                        <label className="flex flex-wrap w-24 ml-3">
                          <input
                            type="checkbox"
                            onChange={() => {
                              setRange(!range);
                              if (!range) {
                                setEndDate(startDate);
                              }
                            }}
                            checked={range}
                          />
                          <span className="ml-2">range</span>
                        </label>
                      </div>
                    ) : (
                      dataUniqueByTitle[titleIndex].map((name, nameIndex) => (
                        <label key={nameIndex} className="flex flex-wrap w-24">
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
