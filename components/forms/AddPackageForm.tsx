'use client';
import React, { useEffect, useState, useCallback, use, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import ClientPackageForm from '@/components/forms/package/ClientPackageForm';
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
import MessageCard from '@/components/cards/MessageCard';
import SubAddBtn from '../buttons/package/SubAddBtn';
import SubSubmitAndCancelBtn from '../buttons/package/SubSubmitAndCancelBtn';
import DeviceInfoInPackageForm from './package/DeviceInfoInPackageForm';

interface AddPackageFormProps {
  deviceListLength?: number;
  subPage?: boolean;
  currentPackage?: number;
  handleSubCancelBtn?: () => void;
  handleSubSubmitBtn?: () => void;
  onSuccessfulSubmit?: (
    hasSuccessfulCard: boolean,
    successMessage: string,
  ) => void;
}

interface DeviceData {
  type: string;
  deviceSn: string;
}

interface newPackageInputData {
  clientId: string;
  fittingDate: string;
  warrantyDate: string;
  comment: string;
  devices: DeviceData[];
}

type NewPackageInput = Omit<Package, 'id'>;

export default function AddPackage({
  deviceListLength,
  subPage,
  currentPackage,
  handleSubCancelBtn,
  handleSubSubmitBtn,
  onSuccessfulSubmit,
}: AddPackageFormProps) {
  const form = useForm<newPackageInputData>();
  const { reset, handleSubmit } = form;
  if (deviceListLength === undefined) {
    deviceListLength = 0;
  }

  const clearData = {
    clientPackage: {
      clientId: '',
      fittingDate: '',
      warrantyDate: '',
      comment: '',
    },
    devices: [{ type: '', deviceId: '' }],
  };
  const deviceAvailabilityAmount = 4;
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [allTypeItems, setAllTypeItems] = useState<Type[]>([]);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<Manufacturer[]>([]);
  const [allColors, setAllColors] = useState<Color[]>([]);
  const [deviceAmount, setDeviceAmount] = useState<number>(1);
  const [clientInfo, setClientInfo] = useState<boolean>(false);
  const [thisDevice, setThisDevice] = useState<Device>();
  const [thisDeviceColor, setThisDeviceColor] = useState<string[]>([]);
  const [thisDeviceManufacturer, setThisDeviceManufacturer] = useState<
    string[]
  >([]);
  const [thisDeviceType, setThisDeviceType] = useState<string[]>([]);
  const [modifyingIndex, setModifyingIndex] = useState<number>(0);
  const [hasUnavailableWarning, setHasUnavailableWarning] =
    useState<boolean>(false); // if package id or sell date is found in the device
  const [hasUnknownWarning, setHasUnknownWarning] = useState<boolean>(false); // if device id is not found
  const [hasDuplicateWarning, setHasDuplicateWarning] =
    useState<boolean>(false); // if device id is already in the form
  const [duplicateDeviceId, setDuplicatedDeviceId] = useState<string[]>([]);
  const [warningDeviceId, setWarningDeviceId] = useState<string[]>([]);
  const [errorDeviceId, setErrorDeviceId] = useState<string[]>([]);
  const [hasSuccessfulCard, setHasSuccessfulCard] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

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
  }, [hasSuccessfulCard, successMessage, onSuccessfulSubmit]);

  // handle modifying device index
  const handleGetIndex = useCallback((index: number) => {
    setModifyingIndex(index);
  }, []);

  const onSubmit = async (data: newPackageInputData) => {
    try {
      // checkSnValidity();
      if (
        !hasUnavailableWarning &&
        !hasUnknownWarning &&
        !hasDuplicateWarning
      ) {
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
        setHasSuccessfulCard(true);
        setSuccessMessage(`Package ID ${response.id} is successfully created.`);

        for (let i = 0; i < deviceAmount; i++) {
          await updateDevice(data.devices[i].deviceSn, {
            packageId: response.id,
          });
        }

        reset(clearData);
        setDeviceAmount(1);
        setThisDeviceColor([]);
        setThisDeviceManufacturer([]);
        setThisDeviceType([]);

        if (
          hasSuccessfulCard ||
          hasUnknownWarning ||
          hasDuplicateWarning ||
          hasUnavailableWarning
        ) {
          setTimeout(() => {
            setHasSuccessfulCard(false);
            setHasUnknownWarning(false);
            setHasDuplicateWarning(false);
            setHasUnavailableWarning(false);
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Failed to submit form: ', error);
    }
  };

  const onSubmitSubPage = async () => {
    let currentDeviceId;
    let sns: string[] = [];
    try {
      if (
        !hasUnavailableWarning &&
        !hasUnknownWarning &&
        !hasDuplicateWarning
      ) {
        for (let i = 0; i < deviceAmount; i++) {
          currentDeviceId = form.getValues(`devices.${i}.deviceSn`);
          await updateDevice(currentDeviceId, {
            packageId: currentPackage,
          });
          sns.push(currentDeviceId);
        }
        if (onSuccessfulSubmit) {
          onSuccessfulSubmit(
            true,
            `Device ${sns} are successfully added to package ID ${currentPackage}.`,
          );
        }
      }
      if (handleSubSubmitBtn) {
        handleSubSubmitBtn();
      }
    } catch (error) {
      console.error('Failed to submit form: ', error);
    }
  };

  const handleClientInfo = useCallback(() => {
    setClientInfo(true);
  }, []);

  const handleRemoveClient = useCallback(() => {
    setClientInfo(false);
    // clean client data
    form.setValue('clientId', '');
    form.setValue('fittingDate', '');
    form.setValue('warrantyDate', '');
    form.setValue('comment', '');
  }, [form]);

  return (
    <FormProvider {...form}>
      <div>
        <form
          className="w-fit"
          onSubmit={
            subPage ? handleSubmit(onSubmitSubPage) : handleSubmit(onSubmit)
          }
        >
          <DeviceInfoInPackageForm
            form={form}
            allDevices={allDevices}
            allTypeItems={allTypeItems}
            allColors={allColors}
            allManufacturers={allManufacturers}
            modifyingIndex={modifyingIndex}
            handleGetIndex={handleGetIndex}
            setThisDevice={setThisDevice}
            thisDeviceColor={thisDeviceColor}
            setThisDeviceColor={setThisDeviceColor}
            thisDeviceManufacturer={thisDeviceManufacturer}
            setThisDeviceManufacturer={setThisDeviceManufacturer}
            thisDeviceType={thisDeviceType}
            setThisDeviceType={setThisDeviceType}
            deviceAmount={deviceAmount}
            setDeviceAmount={setDeviceAmount}
            deviceAvailabilityAmount={deviceAvailabilityAmount}
            deviceListLength={deviceListLength}
            setHasDuplicateWarning={setHasDuplicateWarning}
            setDuplicatedDeviceId={setDuplicatedDeviceId}
            setHasUnknownWarning={setHasUnknownWarning}
            setErrorDeviceId={setErrorDeviceId}
            setHasUnavailableWarning={setHasUnavailableWarning}
            setWarningDeviceId={setWarningDeviceId}
          />
          {!subPage && (
            <div>
              <p className="text-xl font-bold mb-8 mt-10">Client Information</p>
              {clientInfo ? (
                <div>
                  <ClientPackageForm
                    clientsData={allClients.map((client) => client.id)}
                  />
                  <SubAddBtn
                    btnName="Remove Client Information"
                    handleClick={handleRemoveClient}
                  />
                </div>
              ) : (
                <SubAddBtn
                  btnName="Add Client"
                  handleClick={handleClientInfo}
                />
              )}
            </div>
          )}
          <div className="h-10"></div>

          {hasDuplicateWarning && (
            <MessageCard
              alertType="alert-warning"
              message={`Warning: Device ${duplicateDeviceId} is already in the form.`}
            />
          )}
          {hasUnavailableWarning && (
            <MessageCard
              alertType="alert-warning"
              message={`Warning: Device ${warningDeviceId} is not available to be assigned to the package.`}
            />
          )}
          {hasUnknownWarning && (
            <MessageCard
              alertType="alert-error"
              message={`Error: Device ${errorDeviceId} is not found.`}
            />
          )}

          {hasSuccessfulCard && (
            <MessageCard alertType="alert-success" message={successMessage} />
          )}

          {subPage && handleSubCancelBtn ? (
            <SubSubmitAndCancelBtn handlePath={handleSubCancelBtn} />
          ) : (
            <SubmitAndCancelDiv cancelPath="./" />
          )}
        </form>
      </div>
    </FormProvider>
  );
}
