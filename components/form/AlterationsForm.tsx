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
    if (inputData.type.length > 0) {
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
                  placeholder="Select date"
                  isRequired
                  name="date"
                  value={inputData.date}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputBox
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
                  placeholder="Select device type"
                  isRequired
                  name="type"
                  data={typeItems}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputBox
                  placeholder="Enter serial number"
                  isRequired
                  name="serialNumber1"
                  value={inputData.serialNumber1}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputBox
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
