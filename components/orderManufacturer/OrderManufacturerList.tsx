'use client';

import React, { useEffect, useState } from 'react';
import { OrderedAtFilter } from './OrderedAtFilter';
import { ManufacturerFilter } from './ManufacturerFilter';
import { OrderManufacturer } from '@/entities/order-manufacturer';
import { getAllOrderManufacturers } from '@/services/orderManufacturer/getOrderManufacturer';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function OrderManufacturerList() {
  const [orderManufacturers, setOrderManufacturers] = useState<
    OrderManufacturer[]
  >([]);
  const [filteredOrderManufacturers, setFilteredOrderManufacturers] = useState<
    OrderManufacturer[]
  >([]);
  const [activeTab, setActiveTab] = useState<
    'All' | 'Processing' | 'Delivered'
  >('All');
  const [selectedManufacturer, setSelectedManufacturer] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderManufacturers = async () => {
      try {
        const data = await getAllOrderManufacturers();
        setOrderManufacturers(data);
        filterOrders(data, 'All');
      } catch (error) {
        console.error('Error fetching order manufacturers:', error);
      }
    };

    fetchOrderManufacturers();
  }, []);

  useEffect(() => {
    filterOrders(orderManufacturers, activeTab);
  }, [selectedManufacturer, selectedDateRange, activeTab]);

  const filterOrders = (
    orders: OrderManufacturer[],
    tab: 'All' | 'Processing' | 'Delivered',
  ) => {
    let filtered = orders;

    if (tab === 'Processing') {
      filtered = orders.filter((order) =>
        order.OrderDevices.some((od) => !od.device.stockInDate),
      );
    } else if (tab === 'Delivered') {
      filtered = orders.filter((order) =>
        order.OrderDevices.some((od) => od.device.stockInDate),
      );
    }

    if (selectedManufacturer) {
      filtered = filtered.filter((order) =>
        order.OrderDevices.some(
          (od) => od.device.manufacturer?.name === selectedManufacturer.label,
        ),
      );
    }

    if (selectedDateRange) {
      filtered = filtered.filter((order) => {
        const orderDate = dayjs(order.orderDate);
        return (
          orderDate.isAfter(
            dayjs(selectedDateRange.startDate).startOf('day'),
          ) && orderDate.isBefore(dayjs(selectedDateRange.endDate).endOf('day'))
        );
      });
    }

    setFilteredOrderManufacturers(filtered);
  };

  const handleClearAll = () => {
    setSelectedManufacturer(null);
    setSelectedDateRange(null);
  };

  const handleTabClick = (tab: 'All' | 'Processing' | 'Delivered') => {
    setActiveTab(tab);
    filterOrders(orderManufacturers, tab);
  };

  const handleViewDetailClick = (orderId: number, isDelivered: boolean) => {
    router.push(`/order-manufacturer/${orderId}?delivered=${isDelivered}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mx-8 mb-2">
        <div className="relative">
          <span>Filter By: </span>
          <ManufacturerFilter onManufacturerSelect={setSelectedManufacturer} />
          <OrderedAtFilter onDateRangeSelect={setSelectedDateRange} />
        </div>
        <Link href="/order-manufacturer/new">
          <button className="btn btn-outline btn-success">+ Add Order</button>
        </Link>
      </div>
      {selectedManufacturer || selectedDateRange ? (
        <div className="border-t border-gray-200 p-1 my-2">
          <div className="flex flex-wrap mt-2 ml-6">
            {selectedManufacturer && (
              <div className="badge badge-outline p-3 badge-lg m-1">
                {selectedManufacturer.label}
                <button
                  className="ml-2"
                  onClick={() => setSelectedManufacturer(null)}
                >
                  ✕
                </button>
              </div>
            )}
            {selectedDateRange && (
              <div className="badge badge-outline p-3 badge-lg m-1">
                {dayjs(selectedDateRange.startDate).format('MM/DD/YYYY')} -{' '}
                {dayjs(selectedDateRange.endDate).format('MM/DD/YYYY')}
                <button
                  className="ml-2"
                  onClick={() => setSelectedDateRange(null)}
                >
                  ✕
                </button>
              </div>
            )}
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 btn-sm ml-2"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      ) : null}
      <div role="tablist" className="tabs tabs-bordered">
        <button
          role="tab"
          className={`tab ${activeTab === 'All' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('All')}
        >
          All
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === 'Processing' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('Processing')}
        >
          Processing
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === 'Delivered' ? 'tab-active' : ''}`}
          onClick={() => handleTabClick('Delivered')}
        >
          Delivered
        </button>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-base text-black font-semibold">#</th>
              <th className="text-base text-black font-semibold">
                Manufacturers
              </th>
              <th className="text-base text-black font-semibold">Amount</th>
              <th className="text-base text-black font-semibold">Order Date</th>
              <th className="text-base text-black font-semibold">
                Stock In Date
              </th>
              <th className="text-base text-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrderManufacturers.map((order, index) => {
              const firstDevice = order.OrderDevices[0]?.device;
              const manufacturerName = firstDevice?.manufacturer?.name || 'N/A';
              const stockInDate = firstDevice?.stockInDate
                ? dayjs(firstDevice.stockInDate).format('MM/DD/YYYY')
                : 'N/A';

              const isDelivered = order.OrderDevices.some(
                (od) => od.device.stockInDate,
              );

              return (
                <tr className="hover" key={order.id}>
                  <th>{index + 1}</th>
                  <td>{manufacturerName}</td>
                  <td>{order.amount}</td>
                  <td>{dayjs(order.orderDate).format('MM/DD/YYYY')}</td>
                  <td>{stockInDate}</td>
                  <td>
                    <button
                      className={`btn btn-outline btn-${isDelivered ? 'success' : 'primary'} btn-sm`}
                      onClick={() =>
                        handleViewDetailClick(order.id, isDelivered)
                      }
                    >
                      {isDelivered ? 'Delivered' : 'View Detail'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
