/**
 * Add Inventory Form Component.
 *
 * This component provides a form for adding new inventory items.
 * It fetches manufacturers, colors, and device types for dropdown selection.
 * Upon successful form submission, it posts inventory data to the server,
 * alerts the user of success or failure, and updates the displayed inventory list.
 */

'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import InputDateBox from '@/components/inputs/InputDateBox';
import InputBox from '@/components/inputs/InputBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Color } from '@/entities/Color';
import { Manufacturer } from '@/entities/manufacturer';
import { Type } from '@/entities/Type';
import { getAllColors } from '@/services/color/getColor';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { getAllTypes } from '@/services/type/getType';
import { postInventory } from '@/services/stock/postInventory';
import { getAllDevices } from '@/services/device/getDevice';
import { deviceToInv } from '@/services/device/deviceToInv';
import MessageCard from '../cards/MessageCard';
// import MessageCard from '@/components/cards/package/MessageCard';

export interface newInventoryInputData {
  stockDate: string;
  manufacturer: string;
  type: string;
  serialNumber: string;
  color: string;
}

const clearInput: newInventoryInputData = {
  stockDate: '',
  manufacturer: '',
  type: '',
  serialNumber: '',
  color: '',
};

export default function AddInventory() {
  const methods = useForm<newInventoryInputData>();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
  } = methods;

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [existingSerialNumbers, setExistingSerialNumbers] = useState<
    Set<string>
  >(new Set());

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
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
      try {
        const devices = await getAllDevices();
        const transformedDevices = await deviceToInv(devices);
        const serialNumbers = new Set(
          transformedDevices.map((device) => device.SN),
        );
        setExistingSerialNumbers(serialNumbers);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: newInventoryInputData) => {
    setErrors({}); // Clear existing errors
    setSuccessMessage(''); // Clear existing success message

    if (Object.values(data).some((field) => field.trim().length === 0)) {
      setErrors((prev) => ({
        ...prev,
        general: 'Please fill in all required fields',
      }));
      return;
    }

    if (existingSerialNumbers.has(data.serialNumber)) {
      setErrors((prev) => ({
        ...prev,
        serialNumber: 'Serial number already exists',
      }));
      return;
    }

    try {
      await postInventory(data);
      setSuccessMessage('Inventory added successfully');
      reset(clearInput);
      const updatedDevices = await getAllDevices();
      const updatedDataSet = await deviceToInv(updatedDevices);
      setExistingSerialNumbers(
        new Set(updatedDataSet.map((device) => device.SN)),
      );
    } catch (error: any) {
      console.error('Error adding inventory', error.response || error);
      setErrors((prev) => ({
        ...prev,
        general: `Failed to add inventory: ${error.response?.data?.message || error.message}`,
      }));
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form className="w-fit" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-y-1 gap-x-12">
            <div>
              <Controller
                name="stockDate"
                control={control}
                defaultValue={new Date().toISOString().split('T')[0]}
                render={({ field }) => (
                  <InputDateBox
                    label="Stock Date"
                    placeholder="Select stock date"
                    isRequired
                    onChangeHandler={field.onChange}
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="manufacturer"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputDropdownBox
                    label="Manufacturer"
                    placeholder="Select manufacturer"
                    isRequired
                    {...field}
                    data={manufacturers.map(
                      (manufacturer) => manufacturer.name,
                    )}
                    onChangeHandler={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputDropdownBox
                    label="Device Type"
                    placeholder="Select device type"
                    isRequired
                    {...field}
                    data={types.map((type) => type.name)}
                    onChangeHandler={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="serialNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputBox
                    label="Serial Number"
                    placeholder="Enter serial number"
                    isRequired
                    onChangeHandler={field.onChange}
                    {...field}
                  />
                )}
              />
              {errors.serialNumber && (
                <MessageCard
                  // shape="M12 8v4m-2-2h4"
                  alertType="bg-red-400"
                  message={errors.serialNumber}
                />
              )}
            </div>
            <div>
              <Controller
                name="color"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputDropdownBox
                    label="Color"
                    placeholder="Select color"
                    isRequired
                    {...field}
                    data={colors.map((color) => color.name)}
                    onChangeHandler={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {successMessage && (
            <div className="mb-4">
              <MessageCard
                // shape="M12 8v4m-2-2h4"
                alertType="bg-green-400"
                message={successMessage}
              />
            </div>
          )}

          {errors.general && (
            <MessageCard
              // shape="M12 8v4m-2-2h4"
              alertType="bg-red-400"
              message={errors.general}
            />
          )}

          <SubmitAndCancelDiv cancelPath="./" />
        </form>
      </div>
    </FormProvider>
  );
}

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
// // import { deviceToInv } from '@/services/device/deviceToInv';
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
//               <h3 className="col-span-2">Device {index + 1}</h3>
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
