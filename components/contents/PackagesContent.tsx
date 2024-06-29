'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, use } from 'react';
import ListTable from '@/components/tables/ListTable';
import SortByBtn from '@/components/buttons/SortByBtn';
import FilterBtn from '@/components/buttons/FilterBtn';
import { Package } from '@/entities/Package';
import { OrderCustomer } from '@/entities/OrderCustomer';
import {
  getAllPackages,
  getAllPackagesSortedFiltered,
} from '@/services/package/getPackage';
import { getAllOrderCustomers } from '@/services/orderCustomer/getOrderCustomer';
import { useRouter } from 'next/navigation';
import AddBtn from '../buttons/AddBtn';
import { set } from 'zod';
import { all } from 'axios';

export default function PackagesContent() {
  const router = useRouter();
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [orderCustomers, setOrderCustomers] = useState<OrderCustomer[]>([]);
  const [sortedData, setSortedData] = useState<
    (string | number | Date | null)[][]
  >([]);
  // for displaying
  const header = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Expiration',
    'Order Date',
    'Comments',
  ];
  const dataColumnName = [
    'id',
    'clientId',
    'fittingDate',
    'warrantyExpiration',
    'orderDate',
    'comments',
  ];
  const [sortBy, setSortBy] = useState<string>(dataColumnName[0]);

  // find sortBy value in header to get the index for displaying
  const sortByIndex = dataColumnName.findIndex((item) => item === sortBy);

  // for filter categories
  const filterHeaderIndexes = [0, 1, 2];
  // for filter categories' title
  const filterHeader = filterHeaderIndexes.map((index) => header[index]);

  const [selectedFilters, setSelectedFilters] = useState<{
    packageId: (string | number)[];
    clientId: (string | number)[];
    fittingDate: (string | number)[];
  }>({
    packageId: [],
    clientId: [],
    fittingDate: [],
  });

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  // for filter data
  const handlerFilter = (selectedBoxes: {
    [key: string]: (string | number)[];
  }) => {
    setSelectedFilters({
      packageId: selectedBoxes[header[0]] || [],
      clientId: selectedBoxes[header[1]] || [],
      fittingDate: selectedBoxes[header[2]] || [],
    });
  };

  useEffect(() => {
    const fetchPackagesData = async () => {
      const [packagesData, orderCustomersData] = await Promise.all([
        getAllPackages(),
        getAllOrderCustomers(),
      ]);
      setAllPackages(packagesData);
      setOrderCustomers(orderCustomersData);
    };
    fetchPackagesData();
  }, []);

  useEffect(() => {
    const fetchSortedFilteredPackagesData = async () => {
      let sortedFilteredData = [];

      if (
        selectedFilters.packageId.length > 0 ||
        selectedFilters.clientId.length > 0 ||
        selectedFilters.fittingDate.length > 0
      ) {
        sortedFilteredData = await getAllPackagesSortedFiltered(
          sortBy,
          selectedFilters,
        );
      } else {
        if (sortBy !== 'orderDate') {
          sortedFilteredData = await getAllPackagesSortedFiltered(sortBy);
        }
      }
      setPackages(sortedFilteredData);
    };
    fetchSortedFilteredPackagesData();
  }, [sortBy, selectedFilters]);

  // convert date to string
  const toDate = (date: string | Date): string => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else {
      throw new Error('Invalid date format.');
    }
  };

  // data for ListTable
  const toTableData = (packages: Package[], showYearMonth: Boolean) => {
    return packages.map((eachPackage) => {
      const orderCustomerDate = orderCustomers.find(
        (orderCustomer) => orderCustomer.id === eachPackage.clientId,
      );
      const orderDate = orderCustomerDate
        ? toDate(orderCustomerDate.orderDate)
        : '';

      return showYearMonth
        ? [
            eachPackage.id,
            eachPackage.clientId,
            toDate(eachPackage.fittingDate).slice(0, 7),
            toDate(eachPackage.warrantyExpiration).slice(0, 7),
            orderDate,
            eachPackage.comments,
          ]
        : [
            eachPackage.id,
            eachPackage.clientId,
            toDate(eachPackage.fittingDate),
            toDate(eachPackage.warrantyExpiration),
            orderDate,
            eachPackage.comments,
          ];
      // if (showYearMonth) {
      //   // for filter data
      //   return [
      //     eachPackage.id,
      //     eachPackage.clientId,
      //     toDate(eachPackage.fittingDate).slice(0, 7),
      //     toDate(eachPackage.warrantyExpiration).slice(0, 7),
      //     orderDate,
      //     eachPackage.comments,
      //   ];
      // } else {
      //   return [
      //     eachPackage.id,
      //     eachPackage.clientId,
      //     toDate(eachPackage.fittingDate),
      //     toDate(eachPackage.warrantyExpiration),
      //     orderDate,
      //     eachPackage.comments,
      //   ];
      // }
    });
  };
  const data = toTableData(packages, false);
  const filterData = toTableData(allPackages, true);

  // when sortBy is 'orderDate', sort by orderDate
  useEffect(() => {
    if (sortBy == 'orderDate') {
      const result = [...data].sort((a, b) => {
        const dateA = a[4] ? a[4].toString() : '';
        const dateB = b[4] ? b[4].toString() : '';
        return dateA.localeCompare(dateB);
      });
      setSortedData(result);
    }
  }, [sortBy]);

  // when row is clicked, go to the detail page
  const handleRowClick = (row: (string | number | Date | null)[]) => {
    const packageId = row[0];
    if (packageId) {
      router.push(`/packages/package_id?package_id=${packageId.toString()}`);
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
            data={filterData}
            onFilter={handlerFilter}
          />
        </div>
        <AddBtn pathName="/packages/add_package" />
      </div>
      <div className="overflow-x-auto">
        <ListTable
          header={header}
          data={sortBy === 'orderDate' ? sortedData : data}
          onClick={handleRowClick}
        />
      </div>
    </div>
  );
}
