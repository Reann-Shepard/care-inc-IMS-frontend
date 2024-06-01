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

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
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
    switch (sortBy) {
      case 'company':
        packages.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'model':
        packages.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case 'color':
        packages.sort((a, b) => a.color.localeCompare(b.color));
        break;
      case 'leftSN':
        packages.sort((a, b) => a.leftSN.localeCompare(b.leftSN));
        break;
      case 'rightSN':
        packages.sort((a, b) => a.rightSN.localeCompare(b.rightSN));
        break;
      case 'remote':
        packages.sort((a, b) => a.remote.localeCompare(b.remote));
        break;
      case 'charger':
        packages.sort((a, b) => a.charger.localeCompare(b.charger));
        break;
    }

    setPackages(packages);
  }, [sortBy]);

  const header = [
    'Company',
    'Model',
    'Color',
    'Left SN',
    'Right SN',
    'Remote',
    'Charger',
  ];
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
            dataColumnName={dataColumnName}
            value={sortBy}
            onSortBy={handleSortBy}
          />
          <FilterBtn />
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
