'use client';
import React, { useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';

interface alterationInputData {
  date: string;
  name: string;
  type: string;
  serialNumber1: string;
  serialNumber2?: string;
  reason: string;
  shippingNumber: string;
}

export default function AlterationsForm() {
  const [inputData, setInputData] = useState<alterationInputData>({
    date: '',
    name: '',
    type: '',
    serialNumber1: '',
    serialNumber2: '',
    reason: '',
    shippingNumber: '',
  });

  // !@TODO: fetch data from database
  const typeItems = [
    'Hearing Aid R',
    'Hearing Aid L',
    'Charger',
    'Earmold',
    'Remote',
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // inputData.type.length > 0 ||
    if (inputData.type.valueOf() !== '') {
      console.log(inputData);
      setInputData({
        date: '',
        name: '',
        type: '',
        serialNumber1: '',
        serialNumber2: '',
        reason: '',
        shippingNumber: '',
      });
      alert('Form submitted');
    } else {
      alert('Please select a device type');
    }
  };

  return (
    <div>
      <form className="w-fit" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <InputDateBox
                  label="Date"
                  placeholder="Select date"
                  isRequired
                  name="date"
                  value={inputData.date}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputBox
                  label="Name"
                  placeholder="Enter customer name"
                  isRequired
                  name="name"
                  value={inputData.name}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputDropdownBox
                  label="Type"
                  placeholder="Select device type"
                  isRequired
                  name="type"
                  value={inputData.type}
                  data={typeItems}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputBox
                  label="Serial Number 1"
                  placeholder="Enter serial number"
                  isRequired
                  name="serialNumber1"
                  value={inputData.serialNumber1}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputBox
                  label="Serial Number 2"
                  placeholder="Enter serial number"
                  name="serialNumber2"
                  value={inputData.serialNumber2}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <InputBox
                  label="Reason"
                  placeholder="Enter reason"
                  name="reason"
                  isRequired
                  value={inputData.reason}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputBox
                  label="Shipping Number"
                  placeholder="Enter shipping number"
                  isRequired
                  name="shippingNumber"
                  value={inputData.shippingNumber}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <SubmitAndCancelDiv cancelPath="./overview" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
