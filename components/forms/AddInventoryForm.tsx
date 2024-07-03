'use client';
import React, { useEffect, useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Color } from '@/entities/Color';
import { getAllColors } from '@/services/color/getColor';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';

interface newInventoryInputData {
  stockDate: string;
  manufacturer: string;
  type: string;
  serialNumber1: string;
  color: string;
}

// export default function AddInventory() {
//   const clearInput = {
//     stockDate: '',
//     manufacturer: '',
//     type: '',
//     serialNumber1: '',
//     color: '',
//   };

const clearInput: newInventoryInputData = {
  stockDate: '',
  manufacturer: '',
  type: '',
  serialNumber1: '',
  color: '',
};
export default function AddInventory() {
  const [inputData, setInputData] = useState<newInventoryInputData>(clearInput);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manufacturers = await getAllManufacturers();
        setManufacturers(manufacturers);
      } catch (error) {
        console.error('Error fetching manufacturers', error);
      }
      try {
        const colors = await getAllColors();
        setColors(colors);
      } catch (error) {
        console.error('Error fetching colors', error);
      }
      try {
        const types = await getAllTypes();
        setTypes(types);
      } catch (error) {
        console.error('Error fetching types', error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (inputData.type.length > 0) {
    if (Object.values(inputData).every((field) => field.trim().length > 0)) {
      console.log(inputData);
      setInputData(clearInput);

      alert('Inventory added successfully');
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div>
      <form className="w-fit" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-1 gap-x-12">
          <InputDateBox
            label="Stock Date"
            placeholder="Select stock date"
            isRequired
            name="stockDate"
            value={inputData.stockDate}
            onChangeHandler={handleInput}
          />
          <InputDropdownBox
            label="Manufacturer"
            placeholder="Select manufacturer"
            isRequired
            name="manufacturer"
            value={inputData.manufacturer}
            data={manufacturers.map((manufacturer) => manufacturer.name)}
            onChangeHandler={handleInput}
          />

          <InputDropdownBox
            label="Device Type"
            placeholder="Select device type"
            isRequired
            name="type"
            value={inputData.type}
            data={types.map((type) => type.name)}
            onChangeHandler={handleInput}
          />

          <InputBox
            label="Serial Number 1"
            placeholder="Enter serial number"
            isRequired
            name="serialNumber1"
            value={inputData.serialNumber1}
            onChangeHandler={handleInput}
          />

          <InputBox
            label="Color"
            placeholder="Enter color"
            isRequired
            name="color"
            value={inputData.color}
            onChangeHandler={handleInput}
          />
        </div>

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
