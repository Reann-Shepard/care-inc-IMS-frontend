'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import ListTable from '@/components/tables/ListTable';
import SortByBtn from '@/components/buttons/SortByBtn';
import FilterBtn from '@/components/buttons/FilterBtn';
import { Package } from '@/entities/Package';
import { OrderCustomer } from '@/entities/OrderCustomer';
import { getAllPackages } from '@/services/package/getPackage';
import { usePackageNavigation } from '@/services/package/usePackageNavigation';
import { getAllOrderCustomers } from '@/services/orderCustomer/getOrderCustomer';

export default function PackagesContent() {
  // const router = useRouter();
  const { pushToPackageId } = usePackageNavigation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [orderCustomers, setOrderCustomers] = useState<OrderCustomer[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const dataColumnName = [
    'id',
    'clientId',
    'fittingDate',
    'warrantyExpiration',
    'orderDate',
    'comments',
  ];
  const [sortBy, setSortBy] = useState<string>(dataColumnName[0]);

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  useEffect(() => {
    //fetch data from database
    const fetchPackagesData = async () => {
      try {
        getAllPackages().then((data) => {
          setPackages(data);
        });
        console.log(packages);
      } catch (error) {
        console.log('Failed fetching Package data', error);
      }
      try {
        getAllOrderCustomers().then((data) => {
          setOrderCustomers(data);
        });
        console.log(orderCustomers);
      } catch (error) {
        console.log('Failed fetching OrderCustomer data', error);
      }
    };
    fetchPackagesData();

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
  const header = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Expiration',
    'Order Date',
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

  const toDate = (date: string | Date): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else {
      throw new Error('Invalid date format.');
    }
  };

  // for data in ListTable
  const data = packages.map((eachPackage) => {
    const orderCustomerDate = orderCustomers.find(
      (orderCustomer) => orderCustomer.id === eachPackage.clientId,
    );
    const orderDate = orderCustomerDate
      ? toDate(orderCustomerDate.orderDate)
      : '';
    return [
      eachPackage.id,
      eachPackage.clientId,
      toDate(eachPackage.fittingDate),
      toDate(eachPackage.warrantyExpiration),
      orderDate,
      eachPackage.comments,
    ];
  });
  console.log(data);

  const handleRowClick = (row: (string | number | Date | null)[]) => {
    const packageId = row[0];
    if (packageId) {
      pushToPackageId(packageId.toString());
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
