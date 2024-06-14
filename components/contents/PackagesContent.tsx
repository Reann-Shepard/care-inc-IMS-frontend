'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import ListTable from '@/components/tables/ListTable';
import SortByBtn from '@/components/buttons/SortByBtn';
import FilterBtn from '@/components/buttons/FilterBtn';
import { getAllPackages } from '@/services/package/getPackage';
import { Package } from '@/entities/Package';
import { usePackageNavigation } from '@/services/package/usePackageNavigation';

export default function PackagesContent() {
  // const router = useRouter();
  const { pushToPackageId } = usePackageNavigation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  // const [selectedRow, setSelectedRow] = React.useState<string | number | Date | null>(null);

  const dataColumnName = [
    'id',
    'clientId',
    'fittingDate',
    'warrantyExpiration',
    'orderCustomerId',
    'comments',
  ];
  const [sortBy, setSortBy] = useState<string>(dataColumnName[0]);

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    //!@TODO: fetch data from database
    // const packages: Package[] = [
    //   {
    //     company: 'Oticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'AOticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'Oticon',
    //     model: 'Real2',
    //     color: 'Blue',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '1338NYCL6',
    //   },
    //   {
    //     company: 'Oticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'COticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '1344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '5338NYCL6',
    //   },
    //   {
    //     company: 'Oticon',
    //     model: 'Real2',
    //     color: 'Green',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '1337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'Oticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '1335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'BOticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '2337F440HN',
    //     charger: '2338NYCL6',
    //   },
    //   {
    //     company: 'BOticon',
    //     model: 'Real2',
    //     color: 'Charcoal',
    //     leftSN: '2335N0R66',
    //     rightSN: '2344N2W2J',
    //     remote: '1337F440HN',
    //     charger: '2338NYCL6',
    //   },
    // ];
    const fetchPackages = async () => {
      getAllPackages().then((data) => {
        setPackages(data);
      });
      console.log(packages);
    };
    fetchPackages();

    // sort by sortBy
    const sortedPackages = (col: keyof Package) => {
      // return [...packages].sort((a, b) => a[col].localeCompare(b[col]));
      return [...packages].sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          return aVal - bVal;
        } else {
          return 0;
        }
      });
    };
    setPackages(sortedPackages(sortBy as keyof Package));
  }, [sortBy]);

  // for displaying
  // const header = [
  //   'Company',
  //   'Model',
  //   'Color',
  //   'Left SN',
  //   'Right SN',
  //   'Remote',
  //   'Charger',
  // ];
  const header = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Expiration',
    'Order Customer ID',
    'Comments',
  ];

  // find sortBy value in header to get the index for displaying
  const sortByIndex = dataColumnName.findIndex((item) => item === sortBy);

  // for filter categories
  // const filterHeader = ['Company', 'Model', 'Color'];
  // const filterHeader = ['Client ID', 'Order Customer ID'];
  const filterHeaderIndexes = [0, 3];
  // for filter categories' title
  const filterHeader = filterHeaderIndexes.map((index) => header[index]);

  // !!@TODO: filter functionality is not working
  // for filter data
  const handlerFilter = (selectedBoxes: { [key: string]: string[] }) => {
    setSelectedFilters(selectedBoxes);
  };

  const toDate = (date: string | Date): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else {
      throw new Error('Invalid date format.');
    }
  };

  // useEffect(() => {
  //   // filter data
  //   const filterPackages = (packages: Package[], selectedFilters: { [key: string]: string[] }) => {
  //     return packages.filter((eachPackage) => {
  //       return Object.keys(selectedFilters).every((key) => {
  //         return selectedFilters[key].length === 0 || selectedFilters[key].includes(eachPackage[key as keyof Package]);
  //       });
  //     });
  //   };
  //   const sortedPackages = (col: keyof Package) => {
  //     return [...filteredPackages].sort((a, b) => a[col].localeCompare(b[col]));
  //   };
  //   setFilteredPackages(filterPackages(packages, selectedFilters));
  // }
  // , [selectedFilters]);

  // for data in ListTable
  const data = packages.map((eachPackage) => [
    eachPackage.id,
    eachPackage.clientId,
    toDate(eachPackage.fittingDate),
    toDate(eachPackage.warrantyExpiration),
    eachPackage.orderCustomerId,
    eachPackage.comments,
  ]);
  console.log(data);

  const handleRowClick = (rowId: string | number | Date | null) => {
    if (rowId) {
      pushToPackageId(rowId.toString());
    }
  };

  return (
    <div>
      <div className="flex m-10 justify-between">
        <div className="flex items-center">
          <SortByBtn
            dataColumnTitles={header}
            dataColumnNames={dataColumnName}
            value={header[sortByIndex]}
            onSortBy={handleSortBy}
          />
          <FilterBtn
            dataColumnIndexes={filterHeaderIndexes}
            dataColumnNames={filterHeader}
            data={data}
            onFilter={handlerFilter}
          />
        </div>
        <Link
          href="/packages/add_package"
          className="btn px-10 font-bold text-white bg-[#54CE50]"
        >
          +
        </Link>
      </div>
      <div className="overflow-x-auto">
        <ListTable header={header} data={data} onClick={handleRowClick} />
      </div>
    </div>
  );
}
