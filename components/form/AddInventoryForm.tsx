'use client';
import React, { useEffect, useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { set } from 'zod';

interface newInventoryInputData {
  stockDate: string;
  manufacturer: string;
  type: string;
  deviceId: string;
  serialNumber1: string;
  serialNumber2: string;
  color: string;
}

export default function AddInventory() {
  const [newInventoryInput, setNewInventoryInput] =
    useState<newInventoryInputData>({
      stockDate: '',
      manufacturer: '',
      type: '',
      deviceId: '',
      serialNumber1: '',
      serialNumber2: '',
      color: '',
    });

  const manufacturers = [
    'Oticon',
    'Unitron (V.RS.7)',
    'Unitron (V.R.7)',
    'Signia',
  ];

  const typeItems = [
    'Hearing Aid R',
    'Hearing Aid L',
    'Charger',
    'Earmold',
    'Remote',
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInventoryInput({ ...newInventoryInput, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInventoryInput.type.length > 0) {
      console.log(newInventoryInput);
      setNewInventoryInput({
        stockDate: '',
        manufacturer: '',
        type: '',
        deviceId: '',
        serialNumber1: '',
        serialNumber2: '',
        color: '',
      });

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
            placeholder="Select stock date"
            isRequired
            name="stockDate"
            value={newInventoryInput.stockDate}
            onChangeHandler={handleInput}
          />
          <InputDropdownBox
            placeholder="Enter manufacturer"
            isRequired
            name="manufacturer"
            data={manufacturers}
            onChangeHandler={handleInput}
          />

          <InputDropdownBox
            placeholder="Select device type"
            isRequired
            name="type"
            data={typeItems}
            onChangeHandler={handleInput}
          />

          <InputBox
            placeholder="Enter device ID"
            isRequired
            name="deviceId"
            value={newInventoryInput.deviceId}
            onChangeHandler={handleInput}
          />

          <InputBox
            placeholder="Enter serial number"
            isRequired
            name="serialNumber1"
            value={newInventoryInput.serialNumber1}
            onChangeHandler={handleInput}
          />

          <InputBox
            placeholder="Enter serial number"
            name="serialNumber2"
            value={newInventoryInput.serialNumber2}
            onChangeHandler={handleInput}
          />

          <InputBox
            placeholder="Enter color"
            isRequired
            name="color"
            value={newInventoryInput.color}
            onChangeHandler={handleInput}
          />
        </div>

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
