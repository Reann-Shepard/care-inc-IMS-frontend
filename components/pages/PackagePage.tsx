'use client';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import ListTable from '@/components/table/ListTable';
import SortByBtn from '@/components/buttons/SortByBtn';
import FilterBtn from '@/components/buttons/FilterBtn';

interface Package {
  company: string;
  model: string;
  color: string;
  leftSN: string;
  rightSN: string;
  remote: string;
  charger: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  // !@TODO: fetch database column names
  const dataColumnName = [
    'company',
    'model',
    'color',
    'leftSN',
    'rightSN',
    'remote',
    'charger',
  ];
  const [sortBy, setSortBy] = useState<string>(dataColumnName[0]);
  // const [sortBy, setSortBy] = useState<string>('company');

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    //!@TODO: fetch data from database
    const packages: Package[] = [
      {
        company: 'Oticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'AOticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'Oticon',
        model: 'Real2',
        color: 'Blue',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '1338NYCL6',
      },
      {
        company: 'Oticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'COticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '1344N2W2J',
        remote: '2337F440HN',
        charger: '5338NYCL6',
      },
      {
        company: 'Oticon',
        model: 'Real2',
        color: 'Green',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '1337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'Oticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '1335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'BOticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '2337F440HN',
        charger: '2338NYCL6',
      },
      {
        company: 'BOticon',
        model: 'Real2',
        color: 'Charcoal',
        leftSN: '2335N0R66',
        rightSN: '2344N2W2J',
        remote: '1337F440HN',
        charger: '2338NYCL6',
      },
    ];

    // sort by sortBy
    const sortedPackages = (col: keyof Package) => {
      return [...packages].sort((a, b) => a[col].localeCompare(b[col]));
    };
    setPackages(sortedPackages(sortBy as keyof Package));
  }, [sortBy]);

  // for displaying
  const header = [
    'Company',
    'Model',
    'Color',
    'Left SN',
    'Right SN',
    'Remote',
    'Charger',
  ];

  // find sortBy value in header to get the index for displaying
  const sortByIndex = dataColumnName.findIndex((item) => item === sortBy);

  // for filter categories
  const filterHeader = ['Company', 'Model', 'Color'];

  // for data in ListTable
  const data = packages.map((eachPackage) => [
    eachPackage.company,
    eachPackage.model,
    eachPackage.color,
    eachPackage.leftSN,
    eachPackage.rightSN,
    eachPackage.remote,
    eachPackage.charger,
  ]);

  return (
    <div>
      <div className="flex m-10 justify-between">
        <div className="flex items-center">
          <SortByBtn
            dataColumnTitle={header}
            dataColumnName={dataColumnName}
            value={header[sortByIndex]}
            onSortBy={handleSortBy}
          />
          <FilterBtn dataTitle={filterHeader} data={data} />
        </div>
        <Link
          href="/packages/add_package"
          className="btn px-10 font-bold text-white bg-[#54CE50]"
        >
          +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <ListTable header={header} data={data} />
      </div>
    </div>
  );
}
