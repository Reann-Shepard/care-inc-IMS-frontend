'use client';
import React, { useState, useRef } from 'react';

interface alterationInputData {
  date: string;
  name: string;
  type: string;
  serialNumber1: string;
  serialNumber2?: string;
  reason: string;
  shippingNumber: string;
}

export default function Alteration() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

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

  const handleType = (selection: string) => {
    setInputData({ ...inputData, type: selection });
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };
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
      <p className="text-2xl text-center">(Header and NavBar)</p>
      <div className="w-full h-10 my-5 bg-gray-200 "></div>
      <div className="mt-20 flex justify-center">
        <form className="w-fit" onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <p className="text-base">
                    Date <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="date"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Select date"
                    value={inputData.date}
                    name="date"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-sm">
                    Name <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 text-sm input input-bordered w-80"
                    placeholder="Enter customer name"
                    value={inputData.name}
                    name="name"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Type <span className="font-bold text-red-600">*</span>
                  </p>
                  <details ref={detailsRef} className="dropdown mt-2 mb-8">
                    <summary className="select input input-bordered btn w-80 justify-between font-normal text-sm">
                      <span>{inputData.type || 'Select device type'}</span>
                    </summary>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                      {typeItems.map((item) => (
                        <li
                          key={item}
                          className="dropdown-item"
                          onClick={() => handleType(item)}
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
                    Serial Number 1{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber1}
                    name="serialNumber1"
                    onChange={handleInput}
                  />
                </td>
                <td className="pl-12">
                  <p className="text-base">Serial Number 2</p>
                  <input
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter serial number"
                    value={inputData.serialNumber2}
                    name="serialNumber2"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <p className="text-base">
                    Reason <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-full text-sm"
                    placeholder="Enter reason"
                    value={inputData.reason}
                    name="reason"
                    onChange={handleInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-base">
                    Shipping Number{' '}
                    <span className="font-bold text-red-600">*</span>
                  </p>
                  <input
                    required
                    type="text"
                    className="mt-2 mb-8 input input-bordered w-80 text-sm"
                    placeholder="Enter shipping number"
                    value={inputData.shippingNumber}
                    name="shippingNumber"
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
