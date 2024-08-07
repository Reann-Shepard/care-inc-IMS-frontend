'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllDevices } from '@/services/device/getDevice';
import { Device } from '@/entities/Device';
import { getThisColorName } from '@/services/color/getColor';
import { getThisTypeName } from '@/services/type/getType';
import { getThisManufacturerName } from '@/services/overview/getOverviewManufacturer';
import BackBtn from '@/components/buttons/BackBtn';
import AddClientInfoForm, {
  newClientInputData,
} from '@/components/forms/package/AddClientInfoForm';
import { getPackageById } from '@/services/package/getPackage';
import { Package } from '@/entities/Package';
import FormBar from '@/components/forms/FormBar';
import SubAddBtn from '@/components/buttons/package/SubAddBtn';
import { toDate } from '@/components/contents/package/toDate';
import AddPackageForm from '@/components/forms/AddPackageForm';
import { removeDevicePackageId } from '@/services/device/updateDevice';
import { removePackageClientInfo } from '@/services/package/updatePackage';
import ConfirmCard from '@/components/cards/ConfirmCard';
import EditPackageDeviceContent from '@/components/contents/package/EditPackageDeviceContent';
import EditPackageContent from '@/components/contents/package/EditPackageContent';
import { deletePackage } from '@/services/package/deletePackage';
import { useRouter } from 'next/navigation';
import { set } from 'zod';
import MessageCard from '@/components/cards/MessageCard';

export default function PackageId() {
  const router = useRouter();
  const clearClientInfoData = {
    clientId: '',
    fittingDate: '',
    warrantyDate: '',
    comment: '',
  };
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('package_id') ?? '';
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceData, setDeviceData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageData, setPackageData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [hasClient, setHasClient] = useState<boolean>(false);
  const [isEditSection, setIsEditSection] = useState<boolean>(false);
  const [isAddClientSection, setIsAddClientSection] = useState<boolean>(false);
  const [isUpdateDeviceSection, setIsUpdateDeviceSection] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clientInfoData, setClientInfoData] =
    useState<newClientInputData>(clearClientInfoData);
  const [editDeviceData, setEditDeviceData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [deviceListUpdate, setDeviceListUpdate] = useState<boolean>(false);
  const [addDeviceSection, setAddDeviceSection] = useState<boolean>(false);
  const [showConfirmCard, setShowConfirmCard] = useState<boolean>(false);
  const [confirmCardContent, setConfirmCardContent] = useState<string>('');
  const [cardFor, setCardFor] = useState<string>('');
  const [hasAlertCard, setHasAlertCard] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [messageAlertType, setMessageAlertType] = useState<string>('');

  const addDeviceFormBarTitle = `Add Device into Package ID ${selectedId}`;
  const updateClientFormBarTitle = `Update Client Information - Package ID ${selectedId}`;

  const alertCardData = (
    hasAlertCard: boolean,
    alertMessage: string,
    messageAlertType: string,
  ) => {
    setHasAlertCard(hasAlertCard);
    setAlertMessage(alertMessage);
    setMessageAlertType(messageAlertType);
    if (hasAlertCard) {
      setTimeout(() => {
        setHasAlertCard(false);
      }, 3000);
    }
  };

  const editDeviceTitle = [
    'Device Serial Number',
    'Manufacturer',
    'Color',
    'Type',
  ];

  // fetch data
  useEffect(() => {
    const fetchDevices = async () => {
      getAllDevices().then((data) => {
        setDevices(data);
      });
      getPackageById(parseInt(selectedId)).then((data) => {
        setPackages([data]);
      });
      setIsLoading(false);
    };
    fetchDevices();
  }, [isAddClientSection, deviceListUpdate]);

  useEffect(() => {
    setDeviceListUpdate(false);
    const current = `Package ID: ${selectedId}`;
    setCurrentLocation(current);
    const fetchData = async () => {
      // package
      const packageDataResult = packages.map((thisPackage) => [
        thisPackage.id,
        thisPackage.clientId ? thisPackage.clientId : 'N/A',
        thisPackage.fittingDate
          ? toDate(thisPackage.fittingDate.toString())
          : 'N/A',
        thisPackage.warrantyExpiration
          ? toDate(thisPackage.warrantyExpiration.toString())
          : 'N/A',
        thisPackage.comments,
      ]) as (string | number | Date | null)[][];
      setPackageData(packageDataResult);

      // devices
      const thisPackageDevices = devices.filter(
        (device) => device.packageId === parseInt(selectedId),
      );
      const data = thisPackageDevices.map(async (thisDevice) => [
        // thisDevice.id,
        thisDevice.serialNumber,
        await getThisManufacturerName(thisDevice.manufacturerId),
        await getThisColorName(thisDevice.colorId),
        await getThisTypeName(thisDevice.typeId),
        toDate(thisDevice.stockInDate),
        toDate(thisDevice.sellDate ?? ''),
        thisDevice.packageId ?? '',
      ]);
      const resolvedData = await Promise.all(data);
      setDeviceData(resolvedData);
    };
    fetchData();
  }, [packages, devices, deviceListUpdate, selectedId]);

  // check if the package has a client
  useEffect(() => {
    if (packages[0] !== undefined) {
      if (packages[0].clientId === undefined || packages[0].clientId === null) {
        setHasClient(false);
        setClientInfoData(clearClientInfoData);
      } else {
        setHasClient(true);
        // for auto filling the client info form when editing the package
        setClientInfoData({
          clientId: packages[0].clientId.toString(),
          fittingDate: packages[0].fittingDate
            ? toDate(packages[0].fittingDate.toString())
            : '',
          warrantyDate: packages[0].warrantyExpiration
            ? toDate(packages[0].warrantyExpiration.toString())
            : '',
          comment: packages[0].comments ?? '',
        });
      }
    }
    const editDeviceDataTemp = deviceData.map((device) => [
      device[0],
      device[1],
      device[2],
      device[3],
    ]);
    setEditDeviceData(editDeviceDataTemp);
  }, [packages, deviceData, hasClient]);

  const handleCancelBtn = () => {
    setIsEditSection(false);
    setIsAddClientSection(false);
    setIsUpdateDeviceSection(false);
    setAddDeviceSection(false);
  };

  useEffect(() => {
    console.log('Updated Alert State:', {
      hasAlertCard,
      alertMessage,
      messageAlertType,
    });
  }, [hasAlertCard, alertMessage, messageAlertType]);

  const handleDeviceRemove = async (index: number) => {
    if (
      deviceData[index][1] !== null &&
      deviceData.length > 1 &&
      deviceData[index][1]
    ) {
      const response = await removeDevicePackageId(
        deviceData[index][1].toString(),
      );
      setDeviceListUpdate(true);
      if (response.id) {
        alertCardData(
          true,
          `Device ${response.id} removed from ${currentLocation} successfully.`,
          'alert-success',
        );
      } else {
        alertCardData(true, 'Failed to remove device', 'alert-error');
      }
    }
    if (deviceData.length === 1 && clientInfoData.clientId === '') {
      setShowConfirmCard(true);
      setConfirmCardContent(
        'Remove the last device will remove the package ID as the same time. Are you sure to remove the last device and the package?',
      );
      setCardFor('packageRemove');
    }
    if (deviceData.length === 1 && clientInfoData.clientId !== '') {
      alertCardData(
        true,
        'Cannot remove the last device when client info exists in the package.',
        'alert-error',
      );
      console.log(
        'check alert card: ',
        hasAlertCard,
        alertMessage,
        messageAlertType,
      );
    }
  };

  const handleRemoveClientBtn = () => {
    setShowConfirmCard(true);
    setConfirmCardContent('Are you sure to remove the client information?');
    setCardFor('clientRemove');
  };

  const handleSubmitAddDevice = () => {
    setAddDeviceSection(false);
    setDeviceListUpdate(true);
  };

  const handleConfirm = async () => {
    let message = '';
    try {
      if (cardFor === 'packageRemove') {
        await deletePackage(parseInt(selectedId));
        message = `PackageID ${selectedId} removed successfully.`;
        router.push('./');
      }
      if (cardFor === 'clientRemove') {
        await removePackageClientInfo(parseInt(selectedId));
        message = 'Removed client information successfully.';
      }
      alertCardData(true, message, 'alert-success');
      setHasClient(false);
      setDeviceListUpdate(true);
      setIsEditSection(false);
      setShowConfirmCard(false);
    } catch (error) {
      alert('Error: Failed to remove. Please try again.');
    }
  };

  const handleSuccessfulCard = (
    hasSuccessfulCard: boolean,
    successMessage: string,
  ) => {
    setHasAlertCard(hasSuccessfulCard);
    setAlertMessage(successMessage);
    setMessageAlertType('alert-success');
  };

  return (
    <div>
      <div className="flex justify-between mx-5">
        <BackBtn
          backToLocation="Packages"
          currentLocation={currentLocation}
          pathName="/packages"
        />
        <div className="flex gap-3">
          {isEditSection ? (
            <SubAddBtn btnName="Done" handleClick={handleCancelBtn} />
          ) : (
            <SubAddBtn
              btnName="Edit"
              handleClick={() => setIsEditSection(true)}
            />
          )}
        </div>
      </div>
      {hasAlertCard && (
        <div className="flex justify-end mx-5">
          <div className="w-[420px]">
            <MessageCard message={alertMessage} alertType={messageAlertType} />
          </div>
        </div>
      )}

      {!isAddClientSection && !isUpdateDeviceSection && (
        <EditPackageContent
          clientCondition={hasClient}
          editCondition={isEditSection}
          loadingCondition={isLoading}
          deviceData={deviceData}
          packageData={packageData}
          handleRemoveClientBtn={() => handleRemoveClientBtn()}
          handleUpdateClientBtn={() => setIsAddClientSection(true)}
          handleUpdateDeviceBtn={() => setIsUpdateDeviceSection(true)}
        />
      )}

      {isAddClientSection && (
        <div>
          <FormBar title={updateClientFormBarTitle} />
          <AddClientInfoForm
            packageId={parseInt(selectedId)}
            clientInfoData={clientInfoData}
            handleSubCancelBtn={handleCancelBtn}
            handleSubSubmitBtn={handleCancelBtn}
            onSuccessfulSubmit={handleSuccessfulCard}
          />
        </div>
      )}

      {!addDeviceSection && isUpdateDeviceSection && (
        <EditPackageDeviceContent
          header={editDeviceTitle}
          data={editDeviceData}
          editData={editDeviceData}
          handRemoveBtn={handleDeviceRemove}
          handleAddBtn={() => setAddDeviceSection(true)}
          deviceData={deviceData}
        />
      )}

      {addDeviceSection && (
        <div>
          <FormBar title={addDeviceFormBarTitle} />
          <div className="flex justify-center">
            <div className="flex-col">
              <p className="mb-1 font-bold">Note:</p>
              <p className="mb-1 font-bold">Maximum device amount: 4</p>
              <p className="mb-10 font-bold">
                Current device amount in this package: {deviceData.length}
              </p>
              <AddPackageForm
                deviceListLength={deviceData.length}
                subPage
                currentPackage={Number(selectedId)}
                handleSubSubmitBtn={handleSubmitAddDevice}
                handleSubCancelBtn={() => setAddDeviceSection(false)}
                onSuccessfulSubmit={handleSuccessfulCard}
              />
            </div>
          </div>
        </div>
      )}

      {showConfirmCard && (
        <ConfirmCard
          title="Remove"
          content={confirmCardContent}
          category={cardFor}
          handleConfirm={handleConfirm}
          handleCancel={() => setShowConfirmCard(false)}
        />
      )}

      <div className="h-24"></div>
    </div>
  );
}
