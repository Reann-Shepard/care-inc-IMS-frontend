'use client';
import React, { useEffect, useState } from 'react';

import InputDateBox from '@/components/inputs/InputDateBox';
import InputDropdownBox from '@/components/inputs/InputDropdownBox';
import DeviceFormInAddPackage from '@/components/forms/DeviceFormInAddPackage';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Color } from '@/entities/Color';
import { getAllColors } from '@/services/color/getColor';
import { Manufacturer } from '@/entities/overviewTypes';
import { getAllManufacturers } from '@/services/overview/getManufacturer';
import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';
import { Client } from '@/entities/Client';
import { getAllClients } from '@/services/client/getClient';
import ClientPackageForm from './ClientPackageForm';

interface DeviceData {
  type: string;
  deviceId: string;
}

interface ClientPackageData {
  clientID: string;
  fittingDate: string;
  warrantyDate: string;
  comment: string;
}
interface newPackageInputData {
  stockDate: string;
  manufacturer: string;
  color: string;
  clientPackage?: ClientPackageData;
  device1: DeviceData;
  device2: DeviceData;
  device3: DeviceData;
  device4: DeviceData;
}

type deviceKey = 'device1' | 'device2' | 'device3' | 'device4';

export default function AddPackage() {
  const clearData = {
    stockDate: '',
    manufacturer: '',
    color: '',
    clientPackage: {
      clientID: '',
      fittingDate: '',
      warrantyDate: '',
      comment: '',
    },
    device1: {
      type: '',
      deviceId: '',
    },
    device2: {
      type: '',
      deviceId: '',
    },
    device3: {
      type: '',
      deviceId: '',
    },
    device4: {
      type: '',
      deviceId: '',
    },
  };
  const [inputData, setInputData] = useState<newPackageInputData>(clearData);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [clients, setClients] = useState<Client[]>([]); // [Client, setClientItems
  const [typeItems, setTypeItems] = useState<Type[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const manufacturers = await getAllManufacturers();
        setManufacturers(manufacturers);
      } catch (error) {
        console.error('Failed fetching Manufacturer data', error);
      }
      try {
        const colors = await getAllColors();
        setColors(colors);
      } catch (error) {
        console.error('Failed fetching Color data', error);
      }
      try {
        const clients = await getAllClients();
        setClients(clients);
      } catch (error) {
        console.error('Failed fetching Client data', error);
      }
      try {
        const types = await getAllTypes();
        setTypeItems(types);
      } catch (error) {
        console.error('Failed fetching Type data', error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleClientPackageInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (inputData.clientPackage) {
      const { name, value } = e.target;
      setInputData({
        ...inputData,
        clientPackage: {
          ...inputData.clientPackage,
          [name]: value,
        },
      });
    }
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
      setInputData(clearData);

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
            </tr>
            <tr>
              <td>
                <InputDropdownBox
                  label="Manufacturer"
                  placeholder="Select manufacturer"
                  isRequired
                  name="manufacturer"
                  value={inputData.manufacturer}
                  data={manufacturers.map((manufacturer) => manufacturer.name)}
                  onChangeHandler={handleInput}
                />
              </td>
              <td className="pl-12">
                <InputDropdownBox
                  label="Color"
                  placeholder="Enter color"
                  isRequired
                  name="color"
                  value={inputData.color}
                  data={colors.map((color) => color.name)}
                  onChangeHandler={handleInput}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <ClientPackageForm
          clientIDValue={inputData.clientPackage?.clientID ?? ''}
          clientsData={clients.map((client) => client.id)}
          fittingDateValue={inputData.clientPackage?.fittingDate ?? ''}
          warrantyDateValue={inputData.clientPackage?.warrantyDate ?? ''}
          commentValue={inputData.clientPackage?.comment ?? ''}
          onChangeHandler={handleClientPackageInput}
        />

        <DeviceFormInAddPackage
          listTitle="Device 1:"
          typeData={typeItems.map((type) => type.name)}
          type={inputData.device1.type}
          deviceId={inputData.device1.deviceId}
          onChangeHandler={(e) => handleDeviceInput('device1' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 2:"
          typeData={typeItems.map((type) => type.name)}
          type={inputData.device2.type}
          deviceId={inputData.device2.deviceId}
          onChangeHandler={(e) => handleDeviceInput('device2' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 3:"
          typeData={typeItems.map((type) => type.name)}
          type={inputData.device3.type}
          deviceId={inputData.device3.deviceId}
          onChangeHandler={(e) => handleDeviceInput('device3' as deviceKey, e)}
        />
        <DeviceFormInAddPackage
          listTitle="Device 4:"
          typeData={typeItems.map((type) => type.name)}
          type={inputData.device4.type}
          deviceId={inputData.device4.deviceId}
          onChangeHandler={(e) => handleDeviceInput('device4' as deviceKey, e)}
        />

        <SubmitAndCancelDiv cancelPath="./" />
      </form>
    </div>
  );
}
