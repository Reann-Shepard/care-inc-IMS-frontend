/**
 * Add Inventory Form Component.
 *
 * This component provides a form for adding new inventory items.
 * It fetches manufacturers, colors, and device types for dropdown selection.
 * Upon successful form submission, it posts inventory data to the server,
 * alerts the user of success or failure, and updates the displayed inventory list.
 */

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
import { deviceToInv } from '@/components/inventory/deviceToInv';
import { getAllDevices } from '@/services/device/getDevice';
import { postInventory } from '@/services/stock/postInventory';
import { getAllInventory } from '@/services/stock/getInventory'; // If fetch inventory data needed

// Interface for new inventory input data
export interface newInventoryInputData {
  stockDate: string;
  manufacturer: string;
  type: string;
  serialNumber1: string;
  color: string;
}

// Initial state for new inventory input data fields
const clearInput: newInventoryInputData = {
  stockDate: '',
  manufacturer: '',
  type: '',
  serialNumber1: '',
  color: '',
};

export default function AddInventory() {
  // const [inputData, setInputData] = useState<newInventoryInputData>(clearInput); // State for new inventory input data
  const [inputData, setInputData] = useState<newInventoryInputData>({
    stockDate: new Date().toISOString().split('T')[0],
    manufacturer: '',
    type: '',
    serialNumber1: '',
    color: '',
  }); // State for new inventory input data

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]); // State for manufacturers data
  const [colors, setColors] = useState<Color[]>([]); // State for colors data
  const [types, setTypes] = useState<Type[]>([]); // State for types data
  const [dataSet, setDataSet] = useState<any[]>([]); // State for inventory data

  useEffect(() => {
    // Fetch manufacturers, colors, and types data when the component mounts
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
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // Handle input change for new inventory data fields
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Handle form submission to add new inventory data to the server
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(inputData).every((field) => field.trim().length > 0)) {
      // Check if all fields are filled
      try {
        await postInventory(inputData); // Post new inventory data to the server
        console.log('Inventory added successfully');
        setInputData(clearInput); // Clear input fields after successful submission
        alert('Inventory added successfully');

        // Fetch updated inventory data to refresh inventory list and overview
        const updatedInventory = await getAllDevices(); // Fetch all devices from the server
        const transformedData = await deviceToInv(updatedInventory); // Transform device data to inventory format
        setDataSet(transformedData); // Set updated inventory data in state

        // Log the submitted data for confirmation
        console.log({
          date: inputData.stockDate,
          name: inputData.manufacturer,
          type: inputData.type,
          serialNumber1: inputData.serialNumber1,
          color: inputData.color,
        });
      } catch (error: any) {
        console.error('Error adding inventory', error.response || error); // Log error message if adding inventory fails
        alert(
          `Failed to add inventory: ${error.response?.data?.message || error.message}`,
        );
      }
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

          <InputDropdownBox
            label="Color"
            placeholder="Select color"
            isRequired
            name="color"
            value={inputData.color}
            data={colors.map((color) => color.name)}
            onChangeHandler={handleInput}
          />
        </div>

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
