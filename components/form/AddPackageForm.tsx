'use client';
import React, { useEffect, useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import DeviceFormInAddPackage from '@/components/form/DeviceFormInAddPackage';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';

// interface DeviceData {
//   type: string;
//   deviceId: string;
//   serialNumber1: string;
//   serialNumber2: string;
// }
interface newPackageInputData {
  stockDate: string;
  manufacturer: string;
  color: string;
  // device1: DeviceData;
  // device2: DeviceData;
  // device3: DeviceData;
  // device4: DeviceData;
  device1: {
    type: string;
    deviceId: string;
    serialNumber1: string;
    serialNumber2?: string;
  };
  device2: {
    type: string;
    deviceId: string;
    serialNumber1: string;
    serialNumber2?: string;
  };
  device3: {
    type: string;
    deviceId: string;
    serialNumber1: string;
    serialNumber2?: string;
  };
  device4: {
    type: string;
    deviceId: string;
    serialNumber1: string;
    serialNumber2?: string;
  };
}

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
    setInputData({ ...inputData, [name]: value });
  };

  const handleDevice1Input = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      device1: {
        ...inputData.device1,
        [name]: value,
      },
    });
  };

  const handleDevice2Input = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      device2: {
        ...inputData.device2,
        [name]: value,
      },
    });
  };

  const handleDevice3Input = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      device3: {
        ...inputData.device3,
        [name]: value,
      },
    });
  };

  const handleDevice4Input = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      device4: {
        ...inputData.device4,
        [name]: value,
      },
    });
  };

  // const handleDeviceInput = ( e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputData({ ...inputData, [name]: value });
  // };

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
          name="device1"
          typeData={typeItems}
          type={inputData.device1.type}
          deviceId={inputData.device1.deviceId}
          serialNumber1={inputData.device1.serialNumber1}
          serialNumber2={inputData.device1.serialNumber2}
          onChangeHandler={handleDevice1Input}
        />
        <DeviceFormInAddPackage
          listTitle="Device 2:"
          name="device2"
          typeData={typeItems}
          type={inputData.device2.type}
          deviceId={inputData.device2.deviceId}
          serialNumber1={inputData.device2.serialNumber1}
          serialNumber2={inputData.device2.serialNumber2}
          onChangeHandler={handleDevice2Input}
        />
        <DeviceFormInAddPackage
          listTitle="Device 3:"
          name="device3"
          typeData={typeItems}
          type={inputData.device3.type}
          deviceId={inputData.device3.deviceId}
          serialNumber1={inputData.device3.serialNumber1}
          serialNumber2={inputData.device3.serialNumber2}
          onChangeHandler={handleDevice3Input}
        />
        <DeviceFormInAddPackage
          listTitle="Device 4:"
          name="device4"
          typeData={typeItems}
          type={inputData.device4.type}
          deviceId={inputData.device4.deviceId}
          serialNumber1={inputData.device4.serialNumber1}
          serialNumber2={inputData.device4.serialNumber2}
          onChangeHandler={handleDevice4Input}
        />

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
