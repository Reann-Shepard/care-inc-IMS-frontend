'use client';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, use } from 'react';
import ListTable from '@/components/tables/ListTable';
import SortByBtn from '@/components/buttons/SortByBtn';
import FilterBtn from '@/components/buttons/FilterBtn';
import { Package } from '@/entities/Package';
import { OrderCustomer } from '@/entities/OrderCustomer';
import { getAllPackages } from '@/services/package/getPackage';
import { getAllOrderCustomers } from '@/services/orderCustomer/getOrderCustomer';
import { useRouter } from 'next/navigation';

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
  const filterHeaderIndexes = [0, 1];
  // for filter categories' title
  const filterHeader = filterHeaderIndexes.map((index) => header[index]);

  const [selectedFilters, setSelectedFilters] = useState<{
    packageId: (string | number)[];
    clientId: (string | number)[];
  }>({
    packageId: [],
    clientId: [],
  });
  const [packageFilter, setPackageFilter] = useState<(string | number)[]>([]);
  const [clientIdFilter, setClientIdFilter] = useState<(string | number)[]>([]);

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  // for filter data
  const handlerFilter = (selectedBoxes: {
    [key: string]: (string | number)[];
  }) => {
    // setSelectedFilters(selectedBoxes);
    // const packageFilterData = selectedBoxes[header[0]] ? selectedBoxes[header[0]].map((item) => item) : [];
    // const clientIdFilterData = selectedBoxes[header[1]] ? selectedBoxes[header[1]].map((item) => item) : [];
    const packageFilterData = selectedBoxes[header[0]] || [];
    const clientIdFilterData = selectedBoxes[header[1]] || [];
    setPackageFilter(packageFilterData);
    setClientIdFilter(clientIdFilterData);
    setSelectedFilters({
      packageId: packageFilter,
      clientId: clientIdFilter,
    });
  };
  // console.log("filter by package Id", selectedFilters[header[0]]);
  // console.log("filter by client Id", selectedFilters[header[1]]);
  console.log('selectedFilters', selectedFilters.clientId.length);

  useEffect(() => {
    const fetchPackagesData = async () => {
      getAllPackages().then((data) => {
        setAllPackages(data);
      });
      if (sortBy != 'orderDate') {
        getAllPackages(sortBy, selectedFilters).then((data) => {
          setPackages(data);
        });
        console.log(packages);
      }
      if (packageFilter.length > 0 || clientIdFilter.length > 0) {
        getAllPackages(sortBy, {
          packageId: packageFilter,
          clientId: clientIdFilter,
        }).then((data) => {
          setPackages(data);
        });
      } else {
        getAllPackages(sortBy).then((data) => {
          setPackages(data);
        });
      }
      getAllOrderCustomers().then((data) => {
        setOrderCustomers(data);
      });
      console.log(orderCustomers);
    };
    fetchPackagesData();
  }, [sortBy, packageFilter, clientIdFilter]);

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

  // for data in ListTable
  const toData = (packages: Package[]) => {
    return packages.map((eachPackage) => {
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
  };
  const data = toData(packages);
  const filterData = toData(allPackages);

  console.log(data);

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
        <Link
          href="/packages/add_package"
          className="btn px-10 font-bold text-white bg-[#54CE50]"
        >
          +
        </Link>
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
