'use client';
import React, { useState, useEffect, use } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';
import { Repair } from '@/entities/Repair';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllRepairs } from '@/services/repair/getRepair';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import devices from '@/components/inventory/temp_invData.json';
import { postRepair } from '@/services/repair/postRepair';

export interface alterationInputData {
  date: string;
  customerID: string;
  manufacturer: string;
  serialNumber: string[];
  type: string[];
  reason: string;
  shippingNumber: string;
}

export default function AlterationsForm() {
  const [inputData, setInputData] = useState<alterationInputData>({
    date: new Date().toISOString().split('T')[0],
    customerID: '',
    manufacturer: '',
    serialNumber: [],
    type: [],
    reason: '',
    shippingNumber: '',
  });

  const [typeList, setTypeList] = useState<string[]>([]);
  const [shipIDs, setShipIDs] = useState<string[]>([]);
  const [manufacturerList, setManufacturerList] = useState<string[]>([]);
  const [alert, setAlert] = useState('');
  const [serialCount, setSerialCount] = useState<number[]>([1]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getAllTypes().then((data) => {
      setTypeList(data.map((type: Type) => type.name));
    });
    getAllRepairs().then((data) => {
      setShipIDs(data.map((repair: Repair) => repair.shipId));
    });
    getAllManufacturers().then((data) => {
      setManufacturerList(
        data.map((manufacturer: Manufacturer) => manufacturer.name),
      );
    });
  }, []);

  useEffect(() => {
    fillTypes();
  }, [inputData.serialNumber]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
  ) => {
    const { name, value } = e.target;
    if (name === 'serialNumber' && index !== undefined) {
      let temp = [...inputData.serialNumber];
      temp[index] = value;
      setInputData({ ...inputData, [name]: temp });
    } else if (name === 'type' && index !== undefined) {
      let temp = [...inputData.type];
      temp[index] = value;
      setInputData({ ...inputData, [name]: temp });
    } else {
      setInputData({ ...inputData, [name]: value });
    }
  };

  const fillTypes = () => {
    inputData.serialNumber.forEach((serial, index) => {
      devices.forEach(async (device) => {
        if (serial === device.SN) {
          let temp = [...inputData.type];
          temp[index] = device.type;
          setInputData({ ...inputData, type: temp });
        }
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let control = true;

    for (let i = 0; i < shipIDs.length; i++) {
      if (inputData.shippingNumber === shipIDs[i]) {
        control = false;
        setErrorMsg('Shipping number already exists');
      }
    }

    for (let i = 0; i < serialCount.length; i++) {
      if (!inputData.type[i]) {
        control = false;
        setErrorMsg('Select device type for all devices');
      }
    }

    if (inputData.manufacturer === '' || !inputData.manufacturer) {
      control = false;
      setErrorMsg('Select manufacturer');
    }

    if (control) {
      postRepair(inputData);
      console.log('Form submitted successfully: ', inputData);
      setInputData({
        date: new Date().toISOString().split('T')[0],
        customerID: '',
        manufacturer: '',
        serialNumber: [],
        type: [],
        reason: '',
        shippingNumber: '',
      });
      setSerialCount([1]);
      setAlert('success');
    } else {
      setAlert('error');
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
                  onChangeHandler={(e) => handleInput(e)}
                />
              </td>
              <td className="pl-12">
                <InputBox
                  label="Customer ID"
                  placeholder="Enter customer ID"
                  isRequired
                  name="customerID"
                  value={inputData.customerID}
                  onChangeHandler={(e) => handleInput(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputDropdownBox
                  label="Manufacturer"
                  placeholder="Select device manufacturer"
                  isRequired
                  name="manufacturer"
                  value={inputData.manufacturer}
                  data={manufacturerList}
                  onChangeHandler={(e) => handleInput(e)}
                />
              </td>
            </tr>
            {serialCount.map((count, index) => (
              <tr key={index}>
                <td>
                  <InputBox
                    label="Serial Number"
                    placeholder="Enter serial number"
                    isRequired
                    name="serialNumber"
                    value={inputData.serialNumber.at(index)}
                    onChangeHandler={(e) => handleInput(e, index)}
                  />
                </td>
                <td className="pl-12">
                  <InputDropdownBox
                    label="Type"
                    placeholder="Select device type"
                    isRequired
                    name="type"
                    value={inputData.type.at(index)}
                    data={typeList}
                    onChangeHandler={(e) => handleInput(e, index)}
                  />
                </td>
                <td>
                  {count == serialCount.length && count != 1 && (
                    <button
                      onClick={() =>
                        setSerialCount(
                          serialCount.slice(0, serialCount.length - 1),
                        )
                      }
                      type="button"
                      className="btn-sm bg-red-300 rounded-md ml-4"
                    >
                      Remove
                    </button>
                  )}
                  {count == serialCount.length && (
                    <button
                      onClick={() =>
                        setSerialCount([...serialCount, count + 1])
                      }
                      type="button"
                      className="btn-sm bg-green-300 rounded-md ml-4"
                    >
                      Add
                    </button>
                  )}
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={2}>
                <InputBox
                  label="Reason"
                  placeholder="Enter reason"
                  name="reason"
                  isRequired
                  value={inputData.reason}
                  onChangeHandler={(e) => handleInput(e)}
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
                  onChangeHandler={(e) => handleInput(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                {alert === 'error' ? (
                  <div role="alert" className="alert bg-red-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                ) : alert === 'success' ? (
                  <div role="alert" className="alert bg-green-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Form Submitted</span>
                  </div>
                ) : null}
                <SubmitAndCancelDiv cancelPath="./overview" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
