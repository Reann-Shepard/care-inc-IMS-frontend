'use client';

import { fetchOptions } from '@/libs/fetch-options';
import { postOrderManufacturer } from '@/services/orderManufacturer/addOrderManufacturer';

import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { OrderManufacturerSelector } from './OrderManufacturerSelector';
import { useRouter } from 'next/navigation';

interface RowData {
  manufacturer: string;
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
  const { handleSubmit, setValue, register } = useForm();
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

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
        manufacturer: '',
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

  const handleSelectChange = (index: number, field: string, value: string) => {
    setValue(`rows[${index}].${field}`, value);
  };

  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);
    const orderData = {
      amount: rows.length,
      orderDate: new Date().toISOString(),
      OrderDevices: rows.map((_, index) => ({
        device: {
          manufacturerId: Number(data.rows[index].manufacturer),
          colorId: Number(data.rows[index].color),
          typeId: Number(data.rows[index].type),
          deleted: false,
        },
      })),
    };
    console.log('Saving data:', orderData);
    try {
      await postOrderManufacturer(orderData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/order-manufacturer');
      });
    } catch (e) {
      console.error('Error Posting data: ', e);
    }
  };

  return (
    <div>
      <div className="flex gap-3 m-2">
        {showToast && (
          <div className="toast toast-center">
            <div className="alert alert-success">
              <span>Orders saved successfully.</span>
            </div>
          </div>
        )}
        <button className="btn btn-outline btn-accent" onClick={handleAddRow}>
          Add Row
        </button>
        <button
          className="btn btn-outline btn-error"
          onClick={handleRemoveRows}
        >
          Remove Row
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => (
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
                    {...register(`rows[${index}].manufacturer`)}
                    onChange={(e) => {
                      handleSelectChange(index, 'manufacturer', e.target.value);
                    }}
                  >
                    {manufacturerOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    {...register(`rows[${index}].type`)}
                    onChange={(e) =>
                      handleSelectChange(index, 'type', e.target.value)
                    }
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    {...register(`rows[${index}].color`)}
                    onChange={(e) =>
                      handleSelectChange(index, 'color', e.target.value)
                    }
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
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
