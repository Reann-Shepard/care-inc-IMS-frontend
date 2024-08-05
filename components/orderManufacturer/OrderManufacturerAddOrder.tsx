'use client';

import { fetchOptions } from '@/libs/fetch-options';
import { postOrderManufacturer } from '@/services/orderManufacturer/addOrderManufacturer';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostOrderManufacturerSchema } from '@/entities/order-manufacturer';

interface RowData {
  type: string;
  color: string;
}

const OrderManufacturerAddOrder = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [manufacturerOptions, setManufacturerOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [typeOptions, setTypeOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [colorOptions, setColorOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [commonManufacturer, setCommonManufacturer] = useState<string>('');
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostOrderManufacturerSchema),
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const router = useRouter();

  watch('commonManufacturer');

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOptions();
      setManufacturerOptions(options.manufacturerOptions);
      setTypeOptions(options.typeOptions);
      setColorOptions(options.colorOptions);
    };

    fetchData();
  }, []);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        type: '',
        color: '',
      },
    ]);
  };

  const handleRemoveRows = () => {
    setRows((prevRows) =>
      prevRows.filter((_, index) => !selectedRows.includes(index)),
    );
    setSelectedRows([]);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevSelectedRows, index],
    );
  };

  const handleSelectChange = (index: number, field: string, value: number) => {
    setValue(`rows[${index}].${field}`, value);
  };

  const onSubmit = async (data: any) => {
    const orderData = {
      amount: rows.length,
      orderDate: new Date().toISOString(),
      OrderDevices: rows.map((_, index) => ({
        device: {
          manufacturerId: Number(commonManufacturer),
          colorId: Number(data.rows[index].color),
          typeId: Number(data.rows[index].type),
          deleted: false,
        },
      })),
    };

    try {
      await postOrderManufacturer(orderData);
      setToastMessage('Orders saved successfully.');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/order-manufacturer');
      }, 1000);
    } catch (e) {
      console.error('Error Posting data: ', e);
      setToastMessage('Failed to save orders');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rows.length === 0) {
      setToastMessage('Please add at least one row before saving.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <div>
      <div className="flex m-3 gap-2 items-center">
        <label className="block text-sm font-medium text-gray-900">
          Select Manufacturer:{' '}
        </label>
        <select
          className="select select-sm select-bordered w-full max-w-xs"
          {...register('commonManufacturer', { valueAsNumber: true })}
        >
          <option value="">Select Manufacturer</option>
          {manufacturerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.commonManufacturer && (
          <span className="text-red-500">
            {errors.commonManufacturer.message as string}
          </span>
        )}
      </div>
      <div className="flex gap-3 m-2">
        {showToast && (
          <div className="toast toast-bottom toast-center fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
            <div
              className={`alert ${toastMessage.startsWith('Please') ? 'alert-error' : 'alert-success'}`}
            >
              {toastMessage}
            </div>
          </div>
        )}
        <button
          className="btn btn-outline btn-sm btn-accent"
          onClick={handleAddRow}
        >
          Add Row
        </button>
        <button
          className="btn btn-outline btn-sm btn-error"
          onClick={handleRemoveRows}
        >
          Remove Row
        </button>
      </div>

      <form onSubmit={onFormSubmit}>
        <table className="table">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-base text-black font-semibold">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="text-base text-black font-semibold">Type</th>
              <th className="text-base text-black font-semibold">Color</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => {
              const { onChange: onTypeChange, ...restType } = register(
                `rows[${index}].type`,
                { valueAsNumber: true },
              );
              const { onChange: onColorChange, ...restColor } = register(
                `rows[${index}].color`,
                { valueAsNumber: true },
              );
              return (
                <tr key={index}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </label>
                  </td>
                  <td>
                    <select
                      {...restType}
                      onChange={(e) => {
                        onTypeChange(e);
                        handleSelectChange(
                          index,
                          'type',
                          Number(e.target.value),
                        );
                      }}
                      className="select select-sm select-bordered w-full max-w-xs"
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      {typeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.rows &&
                      (errors.rows as any)[index] &&
                      (errors.rows as any)[index].type && (
                        <span className="text-red-500">
                          {(errors.rows as any)[index].type.message as string}
                        </span>
                      )}
                  </td>
                  <td>
                    <select
                      {...restColor}
                      onChange={(e) => {
                        onColorChange(e);
                        handleSelectChange(
                          index,
                          'color',
                          Number(e.target.value),
                        );
                      }}
                      className="select select-sm select-bordered w-full max-w-xs"
                    >
                      <option value="" disabled>
                        Select Color
                      </option>
                      {colorOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.rows &&
                      (errors.rows as any)[index] &&
                      (errors.rows as any)[index].color && (
                        <span className="text-red-500">
                          {(errors.rows as any)[index].color.message as string}
                        </span>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex m-5 justify-start">
          <button className="btn btn-info" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export { OrderManufacturerAddOrder };
