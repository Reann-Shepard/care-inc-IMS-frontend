'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState, Suspense, lazy } from 'react';
// import ListTable from '../tables/ListTable';
import SortByBtn from '../buttons/SortByBtn';
import FilterBtn from '../buttons/FilterBtn';
import { Package } from '../../entities/Package';
import { OrderCustomer } from '../../entities/OrderCustomer';
import {
  getAllPackages,
  getAllPackagesSortedFiltered,
} from '../..//services/package/getPackage';
import { getAllOrderCustomers } from '../../services/orderCustomer/getOrderCustomer';
import { useRouter } from 'next/navigation';
import AddBtn from '../buttons/AddBtn';
import { set } from 'zod';
import { all } from 'axios';

const ListTable = lazy(() => import('../tables/ListTable'));

export default function PackagesContent() {
  const router = useRouter();
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [orderCustomers, setOrderCustomers] = useState<OrderCustomer[]>([]);
  const [sortedData, setSortedData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [filteredDataFilterValue, setFilteredDataFilterValue] =
    useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hasFilterResult, setHasFilterResult] = useState<boolean>(true);

  // for displaying: sorting and table header
  const header = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Expiration',
    'Order Date',
    'Comments',
  ];
  const sortByHeader = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Expiration',
    'Order Date',
  ];
  // for sorting column names
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

  // for defining filter categories
  const filterHeaderIndexes = [0, 1, 2];
  // for displaying filter categories' title
  const filterHeader = filterHeaderIndexes.map((index) => header[index]);

  const [selectedFilters, setSelectedFilters] = useState<{
    packageId: (string | number)[];
    clientId: (string | number)[];
    // fittingDate: string | (string | number)[];
  }>({
    packageId: [],
    clientId: [],
    // fittingDate: '',
  });

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  // for filter data
  const handlerFilter = (selectedBoxes: {
    [key: string]: (string | number)[];
  }) => {
    try {
      setSelectedFilters({
        packageId: selectedBoxes[header[0]] || [],
        clientId: selectedBoxes[header[1]] || [],
        // fittingDate: selectedBoxes[header[2]] || '',
      });
    } catch (error) {
      setHasFilterResult(false);
    }
  };

  // get all packages data and orderCustomers data
  useEffect(() => {
    const fetchPackagesData = async () => {
      const [packagesData, orderCustomersData] = await Promise.all([
        getAllPackages(),
        getAllOrderCustomers(),
      ]);
      setAllPackages(packagesData);
      setOrderCustomers(orderCustomersData);
      setLoading(false);
    };
    fetchPackagesData();
  }, []);

  const handleFittingDateFilter = (value: string) => {
    setFilteredDataFilterValue(value);

    handlerFilter({
      ...selectedFilters,
      fittingDate: [value],
    });
  };

  const fittingDateFilterData = (value: string) => {
    let filteredData: Package[] = [];
    if (value.length === 7) {
      allPackages.filter((eachPackage) => {
        if (
          eachPackage.fittingDate !== undefined &&
          eachPackage.fittingDate !== null
        ) {
          const fittingDate = toDate(eachPackage.fittingDate.toString()).slice(
            0,
            7,
          );
          if (fittingDate === value) {
            filteredData.push(eachPackage);
          } else {
            setHasFilterResult(false);
          }
        }
      });
      return filteredData;
    } else if (value.length === 10) {
      allPackages.filter((eachPackage) => {
        if (
          eachPackage.fittingDate !== undefined &&
          eachPackage.fittingDate !== null
        ) {
          const fittingDate = toDate(eachPackage.fittingDate.toString());
          if (fittingDate === value) {
            filteredData.push(eachPackage);
          } else {
            setHasFilterResult(false);
          }
        }
      });
      return filteredData;
    } else {
      setFilteredDataFilterValue('');
      setPackages(allPackages);
      // set no result message
      return [];
    }
  };

  useEffect(() => {
    const fetchSortedFilteredPackagesData = async () => {
      let sortedFilteredData: Package[] = [];

      if (
        selectedFilters.packageId.length > 0 ||
        selectedFilters.clientId.length > 0
        // selectedFilters.fittingDate.length > 0
      ) {
        if (selectedFilters.clientId.find((clientId) => clientId === 'N/A')) {
          packages.filter((eachPackage) => {
            if (eachPackage.clientId === null) {
              sortedFilteredData.push(eachPackage);
            }
          });
        } else {
          sortedFilteredData = await getAllPackagesSortedFiltered(
            sortBy,
            selectedFilters,
          );
        }
      } else {
        if (sortBy !== 'orderDate') {
          sortedFilteredData = await getAllPackagesSortedFiltered(sortBy);
        }
      }
      if (filteredDataFilterValue.length > 0) {
        sortedFilteredData = fittingDateFilterData(filteredDataFilterValue);
      }
      if (sortedFilteredData !== undefined) {
        setPackages(sortedFilteredData);
      }
    };
    fetchSortedFilteredPackagesData();
  }, [sortBy, selectedFilters, filteredDataFilterValue]);

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
  const toTableData = (packages: Package[]) => {
    return packages.map((eachPackage) => {
      const orderCustomerDate = orderCustomers.find(
        (orderCustomer) => orderCustomer.id === eachPackage.orderCustomerId,
      );
      const orderDate = orderCustomerDate
        ? toDate(orderCustomerDate.orderDate)
        : 'N/A';

      return [
        eachPackage.id,
        eachPackage.clientId ? eachPackage.clientId : 'N/A',
        eachPackage.fittingDate
          ? toDate(eachPackage.fittingDate.toString())
          : 'N/A',
        eachPackage.warrantyExpiration
          ? toDate(eachPackage.warrantyExpiration.toString())
          : 'N/A',
        orderDate,
        eachPackage.comments,
      ];
    });
  };

  const data = toTableData(packages);
  const filterData = toTableData(allPackages);

  // when sortBy is 'orderDate', sort by orderDate
  useEffect(() => {
    if (sortBy == 'orderDate') {
      const result = [...data].sort((a, b) => {
        const dateA = a[4] ? a[4].toString() : '';
        const dateB = b[4] ? b[4].toString() : '';
        return dateA.localeCompare(dateB);
      });
      setSortedData(result as (string | number | Date | null)[][]);
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
            dataColumnTitles={sortByHeader}
            dataColumnNames={dataColumnName}
            value={header[sortByIndex]}
            onSortBy={handleSortBy}
          />
          <FilterBtn
            dataColumnIndexes={filterHeaderIndexes}
            dataColumnNames={filterHeader}
            calendarRowIndex={[2]}
            data={filterData as (string | number | Date | null)[][]}
            onFilter={handlerFilter}
            onFittingDateFilter={handleFittingDateFilter}
            fittingDateFilterValue={filteredDataFilterValue}
          />
        </div>
        <AddBtn pathName="/packages/add_package" />
      </div>
      <div className="overflow-x-auto">
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <ListTable
          header={header}
          data={
            sortBy === 'orderDate'
              ? sortedData
              : (data as (string | number | Date | null)[][])
          }
          onClick={handleRowClick}
        />
        {loading && (
          <div className="text-lg flex justify-center">Loading...</div>
        )}
        {!hasFilterResult && (
          <div className="text-lg flex justify-center">No result</div>
        )}
        {/* </Suspense> */}
      </div>
    </div>
  );
}
