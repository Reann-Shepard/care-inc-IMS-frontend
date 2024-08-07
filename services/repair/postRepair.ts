import { alterationInputData } from '@/components/forms/AlterationsForm';
import { getAllManufacturers } from '../overview/getOverviewManufacturer';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllDevices } from '../device/getDevice';
import { Device } from '@/entities/Device';
import apiClient from '../auth/axios-interceptor';

const postRepair = async (data: alterationInputData) => {
  const manufacturerList: Manufacturer[] = await getAllManufacturers();
  const deviceList: Device[] = await getAllDevices();

  const repairData = {
    client: Number(data.customerID),
    manufacturer: Number(
      manufacturerList.find(
        (manufacturer) => manufacturer.name === data.manufacturer,
      )?.id,
    ),
    reason: data.reason,
    shippingDate: new Date(data.date),
    shipId: data.shippingNumber,
    receivedDate: null,
    repairDevices: data.serialNumber.map((serialNumber) =>
      Number(
        deviceList.find((device) => device.serialNumber === serialNumber)?.id,
      ),
    ),
  };

  try {
    const response = await apiClient.post('/repair', repairData);
    console.log('New repair added: ', response.data);
  } catch (error) {
    console.error('Error adding repair: ', error);
  }
};

export { postRepair };
