'use client';
import React, { useEffect, useState, useCallback, use, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import ClientPackageForm from '@/components/forms/package/ClientPackageForm';
import DeviceFormInAddPackage from '@/components/forms/package/DeviceFormInAddPackage';
import SubmitAndCancelDiv from '@/components/buttons/SubmitAndCancelDiv';
import { Color } from '@/entities/Color';
import { getAllColors } from '@/services/color/getColor';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';
import { Client } from '@/entities/Client';
import { getAllClients } from '@/services/client/getClient';
import { Device } from '@/entities/Device';
import { getAllDevices } from '@/services/device/getDevice';
import { postPackage } from '@/services/package/postPackage';
import { Package } from '@/entities/Package';
import { updateDevice } from '@/services/device/updateDevice';
import MessageCard from '@/components/cards/package/MessageCard';
import SubAddBtn from '../buttons/package/SubAddBtn';

interface DeviceData {
  type: string;
  deviceId: string;
}

interface newPackageInputData {
  clientId: string;
  fittingDate: string;
  warrantyDate: string;
  comment: string;
  devices: DeviceData[];
}

type NewPackageInput = Omit<Package, 'id'>;

export default function AddPackage() {
  const form = useForm<newPackageInputData>();
  const { reset, handleSubmit } = form;

  const clearData = {
    clientPackage: {
      clientId: '',
      fittingDate: '',
      warrantyDate: '',
      comment: '',
    },
    devices: [{ type: '', deviceId: '' }],
  };

  const [allClients, setAllClients] = useState<Client[]>([]);
  const [allTypeItems, setAllTypeItems] = useState<Type[]>([]);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<Manufacturer[]>([]);
  const [allColors, setAllColors] = useState<Color[]>([]);
  const [deviceNo, setDeviceNo] = useState<number>(1);
  const [clientInfo, setClientInfo] = useState<boolean>(false);
  const [thisDevice, setThisDevice] = useState<Device>();
  const [thisDeviceColor, setThisDeviceColor] = useState<string[]>([]);
  const [thisDeviceManufacturer, setThisDeviceManufacturer] = useState<
    string[]
  >([]);
  const [thisDeviceType, setThisDeviceType] = useState<string[]>([]);
  const [hasUnavailableWarning, setHasUnavailableWarning] =
    useState<boolean>(false); // if package id or sell date is found in the device
  const [hasUnknownWarning, setHasUnknownWarning] = useState<boolean>(false); // if device id is not found

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const [clients, types, devices, manufacturers, colors] =
        await Promise.all([
          getAllClients(),
          getAllTypes(),
          getAllDevices(),
          getAllManufacturers(),
          getAllColors(),
        ]);
      setAllClients(clients);
      setAllTypeItems(types);
      setAllDevices(devices);
      setAllManufacturers(manufacturers);
      setAllColors(colors);
    };
    fetchData();
  }, []);

  const getEachDeviceId = useWatch({
    control: form.control,
    name: `devices.${deviceNo - 1}.deviceId`,
  });

  // clear device data when device is not found and when device id input is empty
  const clearDeviceData = useCallback(() => {
    const clearInfo = (prev: string[], newValue: string) => {
      const updated = [...prev];
      updated[deviceNo - 1] = newValue;
      return updated;
    };

    setThisDeviceColor((prev) => clearInfo(prev, ''));
    setThisDeviceManufacturer((prev) => clearInfo(prev, ''));
    setThisDeviceType((prev) => clearInfo(prev, ''));
  }, [deviceNo]);

  // get device info when device id is input
  useEffect(() => {
    if (!getEachDeviceId) {
      clearDeviceData();
      setHasUnknownWarning(false);
      setHasUnavailableWarning(false);
      return;
    }

    const thisDeviceInfo = allDevices.find(
      (device) => device.id === parseInt(getEachDeviceId),
    );

    if (!thisDeviceInfo) {
      clearDeviceData();
      setHasUnknownWarning(true);
      setHasUnavailableWarning(false);
      return;
    }

    setThisDevice(thisDeviceInfo);

    const newColor = allColors.find(
      (color) => color.id === thisDeviceInfo.colorId,
    );
    const newManufacturer = allManufacturers.find(
      (manufacturer) => manufacturer.id === thisDeviceInfo.manufacturerId,
    );
    const newDeviceType = allTypeItems.find(
      (type) => type.id === thisDeviceInfo.typeId,
    );

    const updatedInfo = (prev: string[], newValue: string) => {
      const updated = [...prev];
      updated[deviceNo - 1] = newValue;
      return updated;
    };

    setThisDeviceColor((prev) => updatedInfo(prev, newColor?.name || ''));
    setThisDeviceManufacturer((prev) =>
      updatedInfo(prev, newManufacturer?.name || ''),
    );
    setThisDeviceType((prev) => updatedInfo(prev, newDeviceType?.name || ''));
    setHasUnknownWarning(false);

    if (thisDeviceInfo.packageId || thisDeviceInfo.sellDate) {
      setHasUnavailableWarning(true);
    } else {
      setHasUnavailableWarning(false);
    }
  }, [getEachDeviceId]);

  const onSubmit = async (data: newPackageInputData) => {
    console.log('len: ', deviceNo);
    try {
      console.log('all input: ', data);
      // console.log('client: ', data.clientId);
      // console.log('all input - client Id: ', data['clientPackage']?.clientId);
      if (hasUnknownWarning || hasUnavailableWarning) {
        alert(
          'This Device ID cannot be assigned to the package. Please check the device ID.',
        );
      } else {
        const packageData: NewPackageInput = {
          clientId: data.clientId ? parseInt(data.clientId) : undefined,
          fittingDate: data.fittingDate
            ? new Date(data.fittingDate).toISOString()
            : undefined,
          warrantyExpiration: data.warrantyDate
            ? new Date(data.warrantyDate).toISOString()
            : undefined,
          comments: data.comment ?? null,
        };

        const response = await postPackage(packageData);

        for (let i = 0; i < deviceNo; i++) {
          await updateDevice(parseInt(data.devices[i].deviceId), {
            packageId: response.id,
          });
        }

        reset(clearData);
        setDeviceNo(1);
        setThisDeviceColor([]);
        setThisDeviceManufacturer([]);
        setThisDeviceType([]);
        alert('Form submitted');
      }
    } catch (error) {
      console.error('Failed to submit form: ', error);
    }
  };

  const handleAddDevice = useCallback(() => {
    if (deviceNo < 4) {
      setDeviceNo((getDeviceNo) => getDeviceNo + 1);
    }
  }, [deviceNo]);

  const handleClientInfo = useCallback(() => {
    setClientInfo(true);
  }, []);

  return (
    <FormProvider {...form}>
      <div>
        <form className="w-fit" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-xl font-bold">Device Information</p>
          {Array.from({ length: deviceNo }).map((_, index) => (
            <React.Fragment key={index}>
              <DeviceFormInAddPackage
                key={index}
                index={index}
                listTitle={`Device ${index + 1}:`}
                // typeData={allTypeItems.map((type) => type.name)}
                deviceType={thisDeviceType[index] || ''}
                deviceColor={thisDeviceColor[index] || ''}
                deviceManufacturer={thisDeviceManufacturer[index] || ''}
              />
            </React.Fragment>
          ))}
          {hasUnknownWarning ? (
            <MessageCard
              shape="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              alertType="alert-error"
              message="Device ID is not found."
            />
          ) : null}
          {hasUnavailableWarning ? (
            <MessageCard
              shape="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              alertType="alert-warning"
              message="Warning: This device is not available to be assigned to the package."
            />
          ) : null}

          {deviceNo < 4 &&
          !hasUnknownWarning &&
          !hasUnavailableWarning &&
          getEachDeviceId ? (
            <SubAddBtn btnName="Add Device" handleClick={handleAddDevice} />
          ) : (
            <SubAddBtn btnName="Add Device" disabled />
          )}

          <p className="text-xl font-bold mb-8 mt-10">Client Information</p>

          {clientInfo ? (
            <ClientPackageForm
              clientsData={allClients.map((client) => client.id)}
            />
          ) : (
            <SubAddBtn btnName="Add Client" handleClick={handleClientInfo} />
          )}

          <SubmitAndCancelDiv cancelPath="./" />
        </form>
      </div>
    </FormProvider>
  );
}
