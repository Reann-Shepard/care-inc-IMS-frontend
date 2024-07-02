'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { OrderManufacturer } from '@/entities/order-manufacturer';
import { getOrderManufacturerById } from '@/services/orderManufacturer/getOrderManufacturer';
import { Controller, useForm } from 'react-hook-form';
import { OrderManufacturerInput } from './OrderManufacturerInput';

export default function OrderManufacturerDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [orderManufacturer, setOrderManufacturer] =
    useState<OrderManufacturer | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();

  useEffect(() => {
    if (id) {
      getOrderManufacturerById(Number(id))
        .then((data) => {
          setOrderManufacturer(data);
          reset(data);
        })
        .catch((error) => {
          console.error('Error fetching order manufacturer details:', error);
        });
    }
  }, [id, reset]);

  const onSubmit = (data: any) => {
    console.log('Updated data:', data);
    // TODO: Save db into databse
  };

  const handleDiscard = () => {
    if (orderManufacturer) {
      const updatedData = { ...orderManufacturer };
      updatedData.OrderDevices = updatedData.OrderDevices.filter(
        (_, index) => !selected.includes(index),
      );
      reset(updatedData);
      setSelected([]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index],
    );
  };

  const handleDelete = () => {
    if (orderManufacturer) {
      const updatedData = { ...orderManufacturer };
      updatedData.OrderDevices = updatedData.OrderDevices.filter(
        (_, index) => !selected.includes(index),
      );
      // TODO: Call API to delete the items from database
      setOrderManufacturer(updatedData);
      setSelected([]);
    }
  };

  const handleSelectAllChange = () => {
    if (orderManufacturer) {
      if (selected.length === orderManufacturer.OrderDevices.length) {
        setSelected([]);
      } else {
        const allIndexes = orderManufacturer.OrderDevices.map(
          (_, index) => index,
        );
        setSelected(allIndexes);
      }
    }
  };

  if (!orderManufacturer) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-x-auto">
        <div className="mb-2 flex justify-center">
          <span className="text-xl font-bold">Order Manufacturer Details</span>
        </div>
        <div className="flex justify-between mx-5 mb-2">
          <span>
            Order Date:{' '}
            {new Date(orderManufacturer.orderDate).toLocaleDateString()}
          </span>
          <span>Total Order Amount: {orderManufacturer.amount}</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      selected.length === orderManufacturer.OrderDevices.length
                    }
                    onChange={handleSelectAllChange}
                  />
                </label>
              </th>
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Color</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {orderManufacturer.OrderDevices.map((order, index) => (
              <tr key={index} className="hover">
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </label>
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.manufacturer.name`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerInput {...field} control={control} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.type.name`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerInput {...field} control={control} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.color.name`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerInput {...field} control={control} />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.serialNumber`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerInput {...field} control={control} />
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isDirty && selected.length > 0 && (
          <div className="flex justify-between mx-5 mt-4">
            <div>
              <button type="submit" className="btn btn-outline btn-info">
                Save
              </button>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleDiscard}
                className="btn btn-outline btn-warning"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-outline btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
