// /**
//  * Add Inventory Form Component.
//  *
//  * This component provides a form for adding new inventory items.
//  * It fetches manufacturers, colors, and device types for dropdown selection.
//  * Upon successful form submission, it posts inventory data to the server,
//  * alerts the user of success or failure, and updates the displayed inventory list.
//  */

// 'use client';
// import React, { useEffect, useState } from 'react';

// import InputDateBox from '@/components/inputs/InputDateBox';
// import InputBox from '@/components/inputs/InputBox';
// import InputDropdownBox from '@/components/inputs/InputDropdownBox';
// import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
// import { Color } from '@/entities/Color';
// import { getAllColors } from '@/services/color/getColor';
// import { Manufacturer } from '@/entities/manufacturer';
// import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
// import { Type } from '@/entities/Type';
// import { getAllTypes } from '@/services/type/getType';
// import { deviceToInv } from '@/services/device/deviceToInv';
// import { getAllDevices } from '@/services/device/getDevice';
// import { postInventory } from '@/services/stock/postInventory';
// import { getAllInventory } from '@/services/stock/getInventory'; // If fetch inventory data needed

// // Interface for new inventory input data
// interface newInventoryInputData {
//   stockDate: string;
//   manufacturer: string;
//   type: string[];
//   serialNumber: string[];
//   color: string[];
// }

// // Initial state for new inventory input data fields
// const clearInput: newInventoryInputData = {
//   stockDate: new Date().toISOString().split('T')[0],
//   manufacturer: '',
//   type: [''],
//   serialNumber: [''],
//   color: [''],
// };

// export default function AddInventory() {
//   const [inputData, setInputData] = useState<newInventoryInputData>(clearInput); // State for new inventory input data
//   // const [inputData, setInputData] = useState<newInventoryInputData>({
//   //   stockDate: new Date().toISOString().split('T')[0],
//   //   manufacturer: '',
//   //   type: [''],
//   //   serialNumber: [''],
//   //   color: [''],
//   // }); // State for new inventory input data

//   const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]); // State for manufacturers data
//   const [colors, setColors] = useState<Color[]>([]); // State for colors data
//   const [types, setTypes] = useState<Type[]>([]); // State for types data
//   const [errorMsg, setErrorMsg] = useState('');
//   const [dataSet, setDataSet] = useState<any[]>([]); // State for inventory data

//   const [serialCount, setSerialCount] = useState<number[]>([1]); // State for serial number count

//   useEffect(() => {
//     // Fetch manufacturers, colors, and types data when the component mounts
//     const fetchData = async () => {
//       try {
//         const manufacturers = await getAllManufacturers();
//         setManufacturers(manufacturers);
//       } catch (error) {
//         console.error('Error fetching manufacturers', error);
//       }
//       try {
//         const colors = await getAllColors();
//         setColors(colors);
//       } catch (error) {
//         console.error('Error fetching colors', error);
//       }
//       try {
//         const types = await getAllTypes();
//         setTypes(types);
//       } catch (error) {
//         console.error('Error fetching types', error);
//       }
//     };
//     fetchData(); // Call the fetchData function when the component mounts
//   }, []);

//   // Handle input change for new inventory data fields
//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
//     const { name, value } = e.target;
//     setInputData({ ...inputData, [name]: value });
//   };

//   // Handle form submission to add new inventory data to the server
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     let control = true;

//     if (Object.values(inputData).every((field) => field.trim().length > 0)) {
//       // Check if all fields are filled
//       try {
//         for (let i = 0; i < serialCount.length; i++) {
//           if (!inputData.serialNumber[i]) {
//             control = false;
//             setErrorMsg('Select device type for all devices');
//           }
//         }

//         await postInventory(inputData); // Post new inventory data to the server
//         console.log('Inventory added successfully');
//         setInputData(clearInput); // Clear input fields after successful submission
//         alert('Inventory added successfully');

//         // Fetch updated inventory data to refresh inventory list and overview
//         const updatedInventory = await getAllDevices(); // Fetch all devices from the server
//         const transformedData = await deviceToInv(updatedInventory); // Transform device data to inventory format
//         setDataSet(transformedData); // Set updated inventory data in state

//         // Log the submitted data for confirmation
//         console.log({
//           date: inputData.stockDate,
//           name: inputData.manufacturer,
//           type: inputData.type,
//           serialNumber1: inputData.serialNumber,
//           color: inputData.color,
//         });
//       } catch (error: any) {
//         console.error('Error adding inventory', error.response || error); // Log error message if adding inventory fails
//         alert(
//           `Failed to add inventory: ${error.response?.data?.message || error.message}`,
//         );
//       }
//     } else {
//       alert('Please fill in all required fields');
//     }
//   };

//   return (
//     <div>
//       <form className="w-fit" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-y-1 gap-x-12">
//           <InputDateBox
//             label="Stock Date"
//             placeholder="Select stock date"
//             isRequired
//             name="stockDate"
//             value={inputData.stockDate}
//             onChangeHandler={handleInput}
//           />
//           <InputDropdownBox
//             label="Manufacturer"
//             placeholder="Select manufacturer"
//             isRequired
//             name="manufacturer"
//             value={inputData.manufacturer}
//             data={manufacturers.map((manufacturer) => manufacturer.name)}
//             onChangeHandler={handleInput}
//           />

//           {/* <InputDropdownBox
//             label="Device Type"
//             placeholder="Select device type"
//             isRequired
//             name="type"
//             value={inputData.type}
//             data={types.map((type) => type.name)}
//             onChangeHandler={handleInput}
//           />

//           <InputBox
//             label="Serial Number"
//             placeholder="Enter serial number"
//             isRequired
//             name="serialNumber"
//             value={inputData.serialNumber}
//             onChangeHandler={handleInput}
//           />

//           <InputDropdownBox
//             label="Color"
//             placeholder="Select color"
//             isRequired
//             name="color"
//             value={inputData.color}
//             data={colors.map((color) => color.name)}
//             onChangeHandler={handleInput}
//           /> */}

//           {serialCount.map((count, index) => (
//             <div key={index}>
//               <td className="pl-12">
//                 <InputDropdownBox
//                   label="Device Type"
//                   placeholder="Select device type"
//                   isRequired
//                   name="type"
//                   value={inputData.type.at(index)}
//                   data={types.map((type: Type) => type.name)}
//                   onChangeHandler={(e) => handleInput(e, index)}
//                 />
//               </td>

//               <td>
//                 <InputBox
//                   label="Serial Number"
//                   placeholder="Enter serial number"
//                   isRequired
//                   name="serialNumber"
//                   value={inputData.serialNumber.at(index)}
//                   onChangeHandler={(e) => handleInput(e, index)}
//                 />
//               </td>

//               <td>
//                 <InputDropdownBox
//                   label="Color"
//                   placeholder="Select color"
//                   isRequired
//                   name="color"
//                   value={inputData.color.at(index)}
//                   data={colors.map((color: Color) => color.name)}
//                   onChangeHandler={(e) => handleInput(e, index)}
//                 />
//               </td>
//               <td>
//                 {count == serialCount.length && count != 1 && (
//                   <button
//                     onClick={() =>
//                       setSerialCount(
//                         serialCount.slice(0, serialCount.length - 1),
//                       )
//                     }
//                     type="button"
//                     className="btn-sm bg-red-300 rounded-md ml-4"
//                   >
//                     Remove
//                   </button>
//                 )}
//                 {count == serialCount.length && (
//                   <button
//                     onClick={() =>
//                       setSerialCount([...serialCount, count + 1])
//                     }
//                     type="button"
//                     className="btn-sm bg-green-300 rounded-md ml-4"
//                   >
//                     Add
//                   </button>
//                 )}
//               </td>
//             </div>
//           ))}

//           <SubmitAndCancelDiv cancelPath="./" />
//         </div>
//       </form>
//     </div>
//   );
// }

/**
 * Add Inventory Form Component.
 *
 * This component provides a form for adding new inventory items.
 * It fetches manufacturers, colors, and device types for dropdown selection.
 * Upon successful form submission, it posts inventory data to the server,
 * alerts the user of success or failure, and updates the displayed inventory list.
 */

// 'use client';
// import React, { useEffect, useState } from 'react';

// import InputDateBox from '@/components/inputs/InputDateBox';
// import InputBox from '@/components/inputs/InputBox';
// import InputDropdownBox from '@/components/inputs/InputDropdownBox';
// import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
// import { Color } from '@/entities/Color';
// import { getAllColors } from '@/services/color/getColor';
// import { Manufacturer } from '@/entities/manufacturer';
// import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
// import { Type } from '@/entities/Type';
// import { getAllTypes } from '@/services/type/getType';
// import { deviceToInv } from '@/services/device/deviceToInv';
// import { getAllDevices } from '@/services/device/getDevice';
// import { postInventory } from '@/services/stock/postInventory';
// import { getAllInventory } from '@/services/stock/getInventory'; // If fetch inventory data needed

// // Interface for new inventory input data
// export interface newInventoryInputData {
//   stockDate: string;
//   manufacturer: string;
//   type: string[];
//   serialNumber: string[];
//   color: string[];
// }

// // Initial state for new inventory input data fields
// const clearInput: newInventoryInputData = {
//   stockDate: new Date().toISOString().split('T')[0],
//   manufacturer: '',
//   type: [''],
//   serialNumber: [''],
//   color: [''],
// };

// export default function AddInventory() {
//   const [inputData, setInputData] = useState<newInventoryInputData>(clearInput); // State for new inventory input data

//   const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]); // State for manufacturers data
//   const [colors, setColors] = useState<Color[]>([]); // State for colors data
//   const [types, setTypes] = useState<Type[]>([]); // State for types data
//   const [errorMsg, setErrorMsg] = useState('');
//   const [dataSet, setDataSet] = useState<any[]>([]); // State for inventory data

//   const [serialCount, setSerialCount] = useState<number[]>([1]); // State for serial number count

//   useEffect(() => {
//     // Fetch manufacturers, colors, and types data when the component mounts
//     const fetchData = async () => {
//       try {
//         const manufacturers = await getAllManufacturers();
//         setManufacturers(manufacturers);
//       } catch (error) {
//         console.error('Error fetching manufacturers', error);
//       }
//       try {
//         const colors = await getAllColors();
//         setColors(colors);
//       } catch (error) {
//         console.error('Error fetching colors', error);
//       }
//       try {
//         const types = await getAllTypes();
//         setTypes(types);
//       } catch (error) {
//         console.error('Error fetching types', error);
//       }
//     };
//     fetchData(); // Call the fetchData function when the component mounts
//   }, []);

//   // Handle input change for new inventory data fields
//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
//     const { name, value } = e.target;
//     if (index !== undefined) {
//       const updatedArray = [...inputData[name as keyof newInventoryInputData] as string[]];
//       updatedArray[index] = value;
//       setInputData({ ...inputData, [name]: updatedArray });
//     } else {
//       setInputData({ ...inputData, [name]: value });
//     }
//   };

//   // Handle form submission to add new inventory data to the server
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     let control = true;

//     // Check if all fields are filled
//     const allFieldsFilled = Object.values(inputData).every((field) => {
//       if (Array.isArray(field)) {
//         // If field is an array, check that every element in the array is a non-empty string
//         return field.every(item => item.trim().length > 0);
//       } else if (typeof field === 'string') {
//         // If field is a string, check that it is non-empty
//         return field.trim().length > 0;
//       }
//       return false; // For any unexpected data types
//     });

//     if (allFieldsFilled) {
//       try {
//         for (let i = 0; i < serialCount.length; i++) {
//           if (!inputData.serialNumber[i]) {
//             control = false;
//             setErrorMsg('Select device type for all devices');
//           }
//         }

//         // if (Object.values(inputData).every((field) => field.trim().length > 0)) {
//         //   // Check if all fields are filled
//         //   try {
//         //     for (let i = 0; i < serialCount.length; i++) {
//         //       if (!inputData.serialNumber[i]) {
//         //         control = false;
//         //         setErrorMsg('Select device type for all devices');
//         //       }
//         //     }

//         await postInventory(inputData); // Post new inventory data to the server
//         console.log('Inventory added successfully');
//         setInputData(clearInput); // Clear input fields after successful submission
//         alert('Inventory added successfully');

//         // Fetch updated inventory data to refresh inventory list and overview
//         const updatedInventory = await getAllDevices(); // Fetch all devices from the server
//         const transformedData = await deviceToInv(updatedInventory); // Transform device data to inventory format
//         setDataSet(transformedData); // Set updated inventory data in state

//         // Log the submitted data for confirmation
//         console.log({
//           date: inputData.stockDate,
//           name: inputData.manufacturer,
//           type: inputData.type,
//           serialNumber: inputData.serialNumber,
//           color: inputData.color,
//         });
//       } catch (error: any) {
//         console.error('Error adding inventory', error.response || error); // Log error message if adding inventory fails
//         alert(
//           `Failed to add inventory: ${error.response?.data?.message || error.message}`,
//         );
//       }
//     } else {
//       alert('Please fill in all required fields');
//     }
//   };

//   const handleAddClick = () => {
//     setSerialCount([...serialCount, serialCount.length + 1]);
//     setInputData({
//       ...inputData,
//       type: [...inputData.type, ''],
//       serialNumber: [...inputData.serialNumber, ''],
//       color: [...inputData.color, ''],
//     });
//   };

//   const handleRemoveClick = (index: number) => {
//     const updatedSerialCount = serialCount.filter((_, i) => i !== index);
//     setSerialCount(updatedSerialCount);

//     const updatedType = inputData.type.filter((_, i) => i !== index);
//     const updatedSerialNumber = inputData.serialNumber.filter((_, i) => i !== index);
//     const updatedColor = inputData.color.filter((_, i) => i !== index);

//     setInputData({
//       ...inputData,
//       type: updatedType,
//       serialNumber: updatedSerialNumber,
//       color: updatedColor,
//     });
//   };

//   return (
//     <div>
//       <form className="w-fit" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-y-1 gap-x-12">
//           <InputDateBox
//             label="Stock Date"
//             placeholder="Select stock date"
//             isRequired
//             name="stockDate"
//             value={inputData.stockDate}
//             onChangeHandler={handleInput}
//           />
//           <InputDropdownBox
//             label="Manufacturer"
//             placeholder="Select manufacturer"
//             isRequired
//             name="manufacturer"
//             value={inputData.manufacturer}
//             data={manufacturers.map((manufacturer) => manufacturer.name)}
//             onChangeHandler={handleInput}
//           />

//           {serialCount.map((count, index) => (
//             <React.Fragment key={index}>
//               <h3 className="col-span-2 font-bold">Device {index + 1}</h3>
//               <InputDropdownBox
//                 label="Device Type"
//                 placeholder="Select device type"
//                 isRequired
//                 name="type"
//                 value={inputData.type[index]}
//                 data={types.map((type: Type) => type.name)}
//                 onChangeHandler={(e) => handleInput(e, index)}
//               />
//               <InputBox
//                 label="Serial Number"
//                 placeholder="Enter serial number"
//                 isRequired
//                 name="serialNumber"
//                 value={inputData.serialNumber[index]}
//                 onChangeHandler={(e) => handleInput(e, index)}
//               />
//               <div className="flex col-span-2 items-center justify-between">
//                 <InputDropdownBox
//                   label="Color"
//                   placeholder="Select color"
//                   isRequired
//                   name="color"
//                   value={inputData.color[index]}
//                   data={colors.map((color: Color) => color.name)}
//                   onChangeHandler={(e) => handleInput(e, index)}
//                 />
//                 <div className="flex space-x-2 ml-auto">
//                   {count !== 1 && (
//                     <button
//                       onClick={() => handleRemoveClick(index)}
//                       type="button"
//                       className="btn-sm bg-red-300 rounded-md"
//                     >
//                       Remove
//                     </button>
//                   )}
//                   {index === serialCount.length - 1 && (
//                     <button
//                       onClick={() => handleAddClick()}
//                       type="button"
//                       className="btn-sm bg-green-300 rounded-md"
//                     >
//                       Add
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}

//           <SubmitAndCancelDiv cancelPath="./" />
//         </div>
//       </form>
//     </div>
//   );
// }

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
import { deviceToInv } from '@/services/device/deviceToInv';
import { getAllDevices } from '@/services/device/getDevice';
import { postInventory } from '@/services/stock/postInventory';
import { getAllInventory } from '@/services/stock/getInventory'; // If fetch inventory data needed

// Interface for new inventory input data
export interface newInventoryInputData {
  stockDate: string;
  manufacturer: string;
  type: string;
  serialNumber: string;
  color: string;
}

// Initial state for new inventory input data fields
const clearInput: newInventoryInputData = {
  stockDate: '',
  manufacturer: '',
  type: '',
  serialNumber: '',
  color: '',
};

export default function AddInventory() {
  // const [inputData, setInputData] = useState<newInventoryInputData>(clearInput); // State for new inventory input data
  const [inputData, setInputData] = useState<newInventoryInputData>({
    stockDate: new Date().toISOString().split('T')[0],
    manufacturer: '',
    type: '',
    serialNumber: '',
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
          serialNumber: inputData.serialNumber,
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
            label="Serial Number"
            placeholder="Enter serial number"
            isRequired
            name="serialNumber"
            value={inputData.serialNumber}
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
