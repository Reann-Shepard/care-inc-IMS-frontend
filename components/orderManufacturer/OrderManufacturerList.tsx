'use client';

import { OrderManufacturer } from '@/entities/order-manufacturer';
import { getAllOrderManufacturers } from '@/services/orderManufacturer/getOrderManufacturer';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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

  const filterOrders = (
    orders: OrderManufacturer[],
    tab: 'All' | 'Processing' | 'Delivered',
  ) => {
    if (tab === 'All') {
      setFilteredOrderManufacturers(orders);
    } else if (tab === 'Processing') {
      const filtered = orders.filter((order) =>
        order.OrderDevices.some((od) => !od.device.stockInDate),
      );
      setFilteredOrderManufacturers(filtered);
    } else if (tab === 'Delivered') {
      const filtered = orders.filter((order) =>
        order.OrderDevices.some((od) => od.device.stockInDate),
      );
      setFilteredOrderManufacturers(filtered);
      console.log(`Filtered data for ${tab} tab:`, filtered);
    }
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
      <div className="flex justify-end mr-8 mb-2">
        <Link href="/order-manufacturer/new">
          <button className="btn btn-outline btn-success">+ Add Order</button>
        </Link>
      </div>
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
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Manufacturers</th>
            <th>Amount</th>
            <th>Order Date</th>
            <th>Stock In Date</th>
            <th>Actions</th>
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
                    onClick={() => handleViewDetailClick(order.id, isDelivered)}
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
  );
}
