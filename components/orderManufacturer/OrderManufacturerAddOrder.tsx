'use client';

import { fetchOptions } from '@/libs/fetch-options';
import { useState, useEffect } from 'react';

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

  const handleInputChange = (
    index: number,
    field: keyof RowData,
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevSelectedRows, index],
    );
  };

  return (
    <div>
      <div className="flex gap-3 m-2">
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
          {rows.map((row, index) => (
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
                  value={row.manufacturer}
                  onChange={(e) =>
                    handleInputChange(index, 'manufacturer', e.target.value)
                  }
                  className="select select-bordered"
                >
                  {manufacturerOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.type}
                  onChange={(e) =>
                    handleInputChange(index, 'type', e.target.value)
                  }
                  className="select select-bordered"
                >
                  {typeOptions.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.color}
                  onChange={(e) =>
                    handleInputChange(index, 'color', e.target.value)
                  }
                  className="select select-bordered"
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.label}>
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
        <button className="btn btn-info">Save</button>
      </div>
    </div>
  );
};

export { OrderManufacturerAddOrder };
