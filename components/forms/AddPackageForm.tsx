'use client';
import React, { useEffect, useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import DeviceFormInAddPackage from '@/components/forms/DeviceFormInAddPackage';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';

interface DeviceData {
  type: string;
  deviceId: string;
  serialNumber1: string;
  serialNumber2: string;
}
interface newPackageInputData {
  stockDate: string;
  manufacturer: string;
  color: string;
  device1: DeviceData;
  device2: DeviceData;
  device3: DeviceData;
  device4: DeviceData;
}

type deviceKey = 'device1' | 'device2' | 'device3' | 'device4';

export default function AddPackage() {
  const [inputData, setInputData] = useState<newPackageInputData>({
    stockDate: '',
    manufacturer: '',
    color: '',
    device1: {
      type: '',
      deviceId: '',
      serialNumber1: '',
      serialNumber2: '',
    },
    device2: {
      type: '',
      deviceId: '',
      serialNumber1: '',
      serialNumber2: '',
    },
    device3: {
      type: '',
      deviceId: '',
      serialNumber1: '',
      serialNumber2: '',
    },
    device4: {
      type: '',
      deviceId: '',
      serialNumber1: '',
      serialNumber2: '',
    },
  });

  // !@TODO: fetch data from database
  const manufacturers = [
    'Oticon',
    'Unitron (V.RS.7)',
    'Unitron (V.R.7)',
    'Signia',
  ];

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

  const handleDeviceInput = (
    deviceNum: deviceKey,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [deviceNum]: {
        ...inputData[deviceNum],
        [name]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputData.device1.type.length > 0) {
      console.log(inputData);
      setInputData({
        stockDate: '',
        manufacturer: '',
        color: '',
        device1: {
          type: '',
          deviceId: '',
          serialNumber1: '',
          serialNumber2: '',
        },
        device2: {
          type: '',
          deviceId: '',
          serialNumber1: '',
          serialNumber2: '',
        },
        device3: {
          type: '',
          deviceId: '',
          serialNumber1: '',
          serialNumber2: '',
        },
        device4: {
          type: '',
          deviceId: '',
          serialNumber1: '',
          serialNumber2: '',
        },
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
                  label="Stock Date"
                  placeholder="Select date"
                  isRequired
                  name="stockDate"
                  value={inputData.stockDate}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputDropdownBox
                  label="Manufacturer"
                  placeholder="Select manufacturer"
                  isRequired
                  name="manufacturer"
                  value={inputData.manufacturer}
                  data={manufacturers}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InputBox
                  label="Color"
                  placeholder="Enter color"
                  isRequired
                  name="color"
                  value={inputData.color}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <DeviceFormInAddPackage
          listTitle="Device 1:"
          typeData={typeItems}
          type={inputData.device1.type}
          deviceId={inputData.device1.deviceId}
          serialNumber1={inputData.device1.serialNumber1}
          serialNumber2={inputData.device1.serialNumber2}
          onChangeHandler={(e) => handleDeviceInput('device1' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 2:"
          typeData={typeItems}
          type={inputData.device2.type}
          deviceId={inputData.device2.deviceId}
          serialNumber1={inputData.device2.serialNumber1}
          serialNumber2={inputData.device2.serialNumber2}
          onChangeHandler={(e) => handleDeviceInput('device2' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 3:"
          typeData={typeItems}
          type={inputData.device3.type}
          deviceId={inputData.device3.deviceId}
          serialNumber1={inputData.device3.serialNumber1}
          serialNumber2={inputData.device3.serialNumber2}
          onChangeHandler={(e) => handleDeviceInput('device3' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 4:"
          typeData={typeItems}
          type={inputData.device4.type}
          deviceId={inputData.device4.deviceId}
          serialNumber1={inputData.device4.serialNumber1}
          serialNumber2={inputData.device4.serialNumber2}
          onChangeHandler={(e) => handleDeviceInput('device4' as deviceKey, e)}
        />

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
