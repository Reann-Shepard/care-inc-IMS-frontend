'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { OrderManufacturer } from '@/entities/order-manufacturer';
import { getOrderManufacturerById } from '@/services/orderManufacturer/getOrderManufacturer';
import { Controller, useForm } from 'react-hook-form';
import { OrderManufacturerInput } from './OrderManufacturerInput';
import { OrderManufacturerSelector } from './OrderManufacturerSelector';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { getAllTypes } from '@/services/type/getType';
import { Manufacturer } from '@/entities/manufacturer';
import { Type } from '@/entities/Type';
import { getAllColors } from '@/services/color/getColor';
import { Color } from '@/entities/Color';
import { updateOrderManufacturerById } from '@/services/orderManufacturer/addOrderManufacturer';

export default function OrderManufacturerDetail() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [orderManufacturer, setOrderManufacturer] =
    useState<OrderManufacturer | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [manufacturerOptions, setManufacturerOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [typeOptions, setTypeOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [colorOptions, setColorOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [showToast, setShowToast] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchOptions = async () => {
      const manufacturers = await getAllManufacturers();
      const manufacturerOptions = manufacturers.map(
        (manufacturer: Manufacturer) => ({
          value: manufacturer.id,
          label: manufacturer.name,
        }),
      );

      const types = await getAllTypes();
      const typeOptions = types.map((type: Type) => ({
        value: type.id,
        label: type.name,
      }));

      const colors = await getAllColors();
      const colorOptions = colors.map((color: Color) => ({
        value: color.id,
        label: color.name,
      }));

      setManufacturerOptions(manufacturerOptions);
      setTypeOptions(typeOptions);
      setColorOptions(colorOptions);

      if (id) {
        const data = await getOrderManufacturerById(Number(id));
        console.log('Fetched data:', data);
        setOrderManufacturer(data);
        reset(data);
      }
    };

    fetchOptions();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const amount = data.OrderDevices.length;
    const updateData = {
      ...data,
      amount,
      OrderDevices: data.OrderDevices.map((od: any) => ({
        deviceId: Number(od.device.id),
        orderManufacturerId: Number(id),
        device: {
          id: od.device.id,
          serialNumber: od.device.serialNumber,
          manufacturerId: Number(od.device.manufacturerId),
          colorId: Number(od.device.colorId),
          typeId: Number(od.device.typeId),
          stockInDate: new Date().toISOString(),
        },
      })),
    };

    console.log('Update Data:', JSON.stringify(updateData, null, 2));
    try {
      await updateOrderManufacturerById(Number(id), updateData);
      console.log('Updated data successfully');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/order-manufacturer');
      }, 2000);
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
        {showToast && (
          <div className="toast toast-center">
            <div className="alert alert-success">
              <span>Orders saved successfully.</span>
            </div>
          </div>
        )}
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
                    name={`OrderDevices[${index}].device.manufacturerId`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerSelector
                        {...field}
                        control={control}
                        options={manufacturerOptions}
                      />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.typeId`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerSelector
                        {...field}
                        control={control}
                        options={typeOptions}
                      />
                    )}
                  />
                </td>
                <td>
                  <Controller
                    name={`OrderDevices[${index}].device.colorId`}
                    control={control}
                    render={({ field }) => (
                      <OrderManufacturerSelector
                        {...field}
                        control={control}
                        options={colorOptions}
                      />
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

        <div className="fixed bottom-5 left-0 right-0 flex justify-between mx-5 mt-4 ">
          <div>
            <button type="submit" className="btn btn-outline btn-info">
              Received
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
      </div>
    </form>
  );
}
