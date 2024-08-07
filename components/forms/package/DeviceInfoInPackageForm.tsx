import React, { useCallback, useEffect, useState } from 'react';
import SubAddBtn from '@/components/buttons/package/SubAddBtn';
import DeviceFormInAddPackage from './EachDeviceInAddPackage';
import { useWatch } from 'react-hook-form';
import { Device } from '@/entities/Device';
import { Type } from '@/entities/Type';
import { Color } from '@/entities/Color';
import { Manufacturer } from '@/entities/manufacturer';

interface DeviceInfoInPackageFormProps {
  form: any;
  allDevices: Device[];
  allTypeItems: Type[];
  allColors: Color[];
  allManufacturers: Manufacturer[];
  modifyingIndex: number;
  handleGetIndex: (index: number) => void;
  setThisDevice: React.Dispatch<React.SetStateAction<Device | undefined>>;
  thisDeviceColor: string[];
  setThisDeviceColor: React.Dispatch<React.SetStateAction<string[]>>;
  thisDeviceManufacturer: string[];
  setThisDeviceManufacturer: React.Dispatch<React.SetStateAction<string[]>>;
  thisDeviceType: string[];
  setThisDeviceType: React.Dispatch<React.SetStateAction<string[]>>;
  deviceAmount: number;
  setDeviceAmount: React.Dispatch<React.SetStateAction<number>>;
  deviceAvailabilityAmount: number;
  deviceListLength: number;
  setHasDuplicateWarning: React.Dispatch<React.SetStateAction<boolean>>;
  setDuplicatedDeviceId: React.Dispatch<React.SetStateAction<string[]>>;
  setHasUnknownWarning: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorDeviceId: React.Dispatch<React.SetStateAction<string[]>>;
  setHasUnavailableWarning: React.Dispatch<React.SetStateAction<boolean>>;
  setWarningDeviceId: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function DeviceInfoInPackageForm({
  form,
  allDevices,
  allTypeItems,
  allColors,
  allManufacturers,
  modifyingIndex,
  handleGetIndex,
  setThisDevice,
  thisDeviceColor,
  setThisDeviceColor,
  thisDeviceManufacturer,
  setThisDeviceManufacturer,
  thisDeviceType,
  setThisDeviceType,
  deviceAmount,
  setDeviceAmount,
  deviceAvailabilityAmount,
  deviceListLength,
  setHasDuplicateWarning,
  setDuplicatedDeviceId,
  setHasUnknownWarning,
  setErrorDeviceId,
  setHasUnavailableWarning,
  setWarningDeviceId,
}: DeviceInfoInPackageFormProps) {
  const [isDeviceListUpdated, setIsDeviceListUpdated] =
    useState<boolean>(false);
  // get device id which is being modified
  const getEachDeviceSn = useWatch({
    control: form.control,
    name: `devices.${modifyingIndex}.deviceSn`,
  });

  // clear device data when device is not found and when device id input is empty
  const clearDeviceData = useCallback(() => {
    const clearInfo = (prev: string[], newValue: string) => {
      const updated = [...prev];
      updated[modifyingIndex] = newValue;
      return updated;
    };

    setThisDeviceColor((prev) => clearInfo(prev, ''));
    setThisDeviceManufacturer((prev) => clearInfo(prev, ''));
    setThisDeviceType((prev) => clearInfo(prev, ''));
  }, [modifyingIndex]);

  // get device info when device id is input
  useEffect(() => {
    setIsDeviceListUpdated(false);
    // no device id input
    if (!getEachDeviceSn) {
      clearDeviceData();
      return;
    }

    const thisDeviceInfo = allDevices.find(
      (device) => device.serialNumber === getEachDeviceSn,
    );

    // device id not found
    if (!thisDeviceInfo) {
      clearDeviceData();
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
      updated[modifyingIndex] = newValue;
      return updated;
    };

    setThisDeviceColor((prev) => updatedInfo(prev, newColor?.name || ''));
    setThisDeviceManufacturer((prev) =>
      updatedInfo(prev, newManufacturer?.name || ''),
    );
    setThisDeviceType((prev) => updatedInfo(prev, newDeviceType?.name || ''));
    console.log('check', deviceAmount);
  }, [getEachDeviceSn, deviceAmount, isDeviceListUpdated]);

  // check if device id is duplicated, unknown, or unavailable

  useEffect(() => {
    let deviceSns: string | string[] = [];
    let deviceDuplicates = [];
    let deviceWarnings: string[] = [];
    let deviceErrors: string[] = [];
    for (let i = 0; i < deviceAmount; i++) {
      const deviceSn = form.getValues(`devices.${i}.deviceSn`);
      // to check if device id is already in the form
      if (deviceSns.length > 0 && deviceSn !== '') {
        if (deviceSns.includes(deviceSn)) {
          deviceDuplicates.push(deviceSn);
        }
      }
      deviceSns.push(deviceSn);

      const checkSn = allDevices.find(
        (device) => device.serialNumber === deviceSn,
      );

      if (deviceSn) {
        if (!checkSn) {
          if (!deviceErrors.includes(deviceSn)) {
            deviceErrors.push(deviceSn);
          }
        } else {
          if (checkSn.packageId || checkSn.sellDate) {
            if (!deviceWarnings.includes(deviceSn)) {
              deviceWarnings.push(deviceSn);
            }
          }
        }
      }
    }

    setHasDuplicateWarning(deviceDuplicates.length > 0);
    setDuplicatedDeviceId(deviceDuplicates.sort());
    setHasUnknownWarning(deviceErrors.length > 0);
    setErrorDeviceId(deviceErrors.sort());
    setHasUnavailableWarning(deviceWarnings.length > 0);
    setWarningDeviceId(deviceWarnings.sort());
  }, [getEachDeviceSn]);

  // const checkSnValidity = () => {
  //   let deviceSns: string | string[] = [];
  //   let deviceDuplicates = [];
  //   let deviceWarnings: string[] = [];
  //   let deviceErrors: string[] = [];
  //   for (let i = 0; i < deviceAmount; i++) {
  //     const deviceSn = form.getValues(`devices.${i}.deviceSn`);
  //     // to check if device id is already in the form
  //     if (deviceSns.length > 0 && deviceSn !== '') {
  //       if (deviceSns.includes(deviceSn)) {
  //         deviceDuplicates.push(deviceSn);
  //       }
  //     }
  //     deviceSns.push(deviceSn);

  //     const checkSn = allDevices.find(
  //       (device) => device.serialNumber === deviceSn,
  //     );

  //     if (deviceSn) {
  //       if (!checkSn) {
  //         if (!deviceErrors.includes(deviceSn)) {
  //           deviceErrors.push(deviceSn);
  //         }
  //       } else {
  //         if (checkSn.packageId || checkSn.sellDate) {
  //           if (!deviceWarnings.includes(deviceSn)) {
  //             deviceWarnings.push(deviceSn);
  //           }
  //         }
  //       }
  //     }
  //   }

  //   setHasDuplicateWarning(deviceDuplicates.length > 0);
  //   setDuplicatedDeviceId(deviceDuplicates.sort());
  //   setHasUnknownWarning(deviceErrors.length > 0);
  //   setErrorDeviceId(deviceErrors.sort());
  //   setHasUnavailableWarning(deviceWarnings.length > 0);
  //   setWarningDeviceId(deviceWarnings.sort());
  // }

  const handleAddDevice = useCallback(() => {
    setIsDeviceListUpdated(true);
    setDeviceAmount((getDeviceAmount) => getDeviceAmount + 1);
  }, [deviceAmount]);

  const handleRemoveDevice = useCallback(() => {
    setIsDeviceListUpdated(true);
    setDeviceAmount((getDeviceAmount) => getDeviceAmount - 1);
    form.setValue(`devices.${deviceAmount - 1}.deviceSn`, '');
    setThisDeviceType((prev) => prev.slice(0, -1));
    setThisDeviceColor((prev) => prev.slice(0, -1));
    setThisDeviceManufacturer((prev) => prev.slice(0, -1));
  }, [deviceAmount]);
  return (
    <div>
      <p className="text-xl font-bold">Device Information</p>
      {Array.from({ length: deviceAmount }).map((_, index) => (
        <DeviceFormInAddPackage
          key={index}
          index={index}
          listTitle={`Device ${index + 1}:`}
          deviceType={thisDeviceType[index] || ''}
          deviceColor={thisDeviceColor[index] || ''}
          deviceManufacturer={thisDeviceManufacturer[index] || ''}
          onClickHandler={() => handleGetIndex(index)}
        />
      ))}

      {deviceAmount === 1 ? (
        <SubAddBtn
          btnName="Add Device"
          handleClick={handleAddDevice}
          disabled={deviceAvailabilityAmount - deviceListLength === 1}
        />
      ) : (
        <React.Fragment>
          {deviceAmount < deviceAvailabilityAmount - deviceListLength ? (
            <div className="flex gap-2">
              <SubAddBtn btnName="Remove" handleClick={handleRemoveDevice} />
              <SubAddBtn btnName="Add Device" handleClick={handleAddDevice} />
            </div>
          ) : (
            <div className="flex gap-2">
              <SubAddBtn btnName="Remove" handleClick={handleRemoveDevice} />
              <SubAddBtn btnName="Add Device" disabled />
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
