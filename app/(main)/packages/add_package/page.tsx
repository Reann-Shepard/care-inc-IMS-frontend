'use client';
import React, { useState, useRef } from 'react';

interface newPackageInputData {
  stockDate: string;
  manufacturer: string;
  color: string;
  type_1: string;
  deviceId_1: string;
  serialNumber1_1: string;
  serialNumber2_1?: string;
  type_2: string;
  deviceId_2: string;
  serialNumber1_2: string;
  serialNumber2_2?: string;
  type_3: string;
  deviceId_3: string;
  serialNumber1_3: string;
  serialNumber2_3?: string;
  type_4: string;
  deviceId_4: string;
  serialNumber1_4: string;
  serialNumber2_4?: string;
}

export default function AddPackage() {
  const detailsOneRef = useRef<HTMLDetailsElement>(null);
  const detailsTwoRef = useRef<HTMLDetailsElement>(null);
  const detailsThreeRef = useRef<HTMLDetailsElement>(null);
  const detailsFourRef = useRef<HTMLDetailsElement>(null);
  const detailsManuRef = useRef<HTMLDetailsElement>(null);

  const [inputData, setInputData] = useState<newPackageInputData>({
    stockDate: '',
    manufacturer: '',
    color: '',
    type_1: '',
    deviceId_1: '',
    serialNumber1_1: '',
    serialNumber2_1: '',
    type_2: '',
    deviceId_2: '',
    serialNumber1_2: '',
    serialNumber2_2: '',
    type_3: '',
    deviceId_3: '',
    serialNumber1_3: '',
    serialNumber2_3: '',
    type_4: '',
    deviceId_4: '',
    serialNumber1_4: '',
    serialNumber2_4: '',
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

  const handleManufacturer = (selection: string) => {
    setInputData({ ...inputData, manufacturer: selection });
    if (detailsManuRef.current) {
      detailsManuRef.current.removeAttribute('open');
    }
  };

  const handleDeviceOneType = (selection: string) => {
    setInputData({ ...inputData, type_1: selection });
    if (detailsOneRef.current) {
      detailsOneRef.current.removeAttribute('open');
    }
  };

  const handleDeviceTwoType = (selection: string) => {
    setInputData({ ...inputData, type_2: selection });
    if (detailsTwoRef.current) {
      detailsTwoRef.current.removeAttribute('open');
    }
  };

  const handleDeviceThreeType = (selection: string) => {
    setInputData({ ...inputData, type_3: selection });
    if (detailsThreeRef.current) {
      detailsThreeRef.current.removeAttribute('open');
    }
  };

  const handleDeviceFourType = (selection: string) => {
    setInputData({ ...inputData, type_4: selection });
    if (detailsFourRef.current) {
      detailsFourRef.current.removeAttribute('open');
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputData.type_1.length > 0) {
      console.log(inputData);
      setInputData({
        stockDate: '',
        manufacturer: '',
        color: '',
        type_1: '',
        deviceId_1: '',
        serialNumber1_1: '',
        serialNumber2_1: '',
        type_2: '',
        deviceId_2: '',
        serialNumber1_2: '',
        serialNumber2_2: '',
        type_3: '',
        deviceId_3: '',
        serialNumber1_3: '',
        serialNumber2_3: '',
        type_4: '',
        deviceId_4: '',
        serialNumber1_4: '',
        serialNumber2_4: '',
      });
      alert('Form submitted');
    } else {
      alert('Please select a device type');
    }
  };

  return (
    <div>
      <div className="w-full h-10 my-5 bg-gray-200 font-bold flex justify-center items-center">
        Add new packages
      </div>
      <div className="mt-20 flex justify-center">
        <form className="w-fit" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <p className="text-base">
                    Stock In Date{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="date"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Select date"
                    value={inputData.stockDate}
                    name="stockDate"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">
                    Manufacturer{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsManuRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>
                        {inputData.manufacturer || 'Select manufacturer'}
                      </span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {manufacturers.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleManufacturer(item)}
                        >
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Color <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter color"
                    value={inputData.color}
                    name="color"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base font-bold mt-8 mb-3">Device 1:</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Type <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsOneRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>{inputData.type_1 || 'Select device type'}</span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {typeItems.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleDeviceOneType(item)}
                        >
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="pl-12">
                  <p>
                    Device Id <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter customer name"
                    value={inputData.deviceId_1}
                    name="deviceId_1"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Serial Number 1{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber1_1}
                    name="serialNumber1_1"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">Serial Number 2</p>
                  <input
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber2_1}
                    name="serialNumber2_1"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base font-bold mt-8 mb-3">Device 2:</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Type <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsTwoRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>{inputData.type_2 || 'Select device type'}</span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {typeItems.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleDeviceTwoType(item)}
                        >
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="pl-12">
                  <p>
                    Device Id <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter customer name"
                    value={inputData.deviceId_2}
                    name="deviceId_2"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Serial Number 1{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber1_2}
                    name="serialNumber1_2"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">Serial Number 2</p>
                  <input
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber2_2}
                    name="serialNumber2_2"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base font-bold mt-8 mb-3">Device 3:</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Type <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsThreeRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>{inputData.type_3 || 'Select device type'}</span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {typeItems.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleDeviceThreeType(item)}
                        >
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="pl-12">
                  <p>
                    Device Id <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter customer name"
                    value={inputData.deviceId_3}
                    name="deviceId_3"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Serial Number 1{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber1_3}
                    name="serialNumber1_3"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">Serial Number 2</p>
                  <input
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber2_3}
                    name="serialNumber2_3"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base font-bold mt-8 mb-3">Device 4:</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Type <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsFourRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>{inputData.type_4 || 'Select device type'}</span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {typeItems.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleDeviceFourType(item)}
                        >
                          <a>{item}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td className="pl-12">
                  <p>
                    Device Id <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter customer name"
                    value={inputData.deviceId_4}
                    name="deviceId_4"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Serial Number 1{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber1_4}
                    name="serialNumber1_4"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">Serial Number 2</p>
                  <input
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber2_4}
                    name="serialNumber2_4"
                    onChange={handleInput}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <button className="mb-20 btn btn-warning">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
