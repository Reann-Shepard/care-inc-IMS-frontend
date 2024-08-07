import axios from 'axios';
import { alterationInputData } from '@/components/forms/AlterationsForm';
import { getAllManufacturers } from '../overview/getOverviewManufacturer';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllDevices } from '../device/getDevice';
import { Device } from '@/entities/Device';

const postRepair = async (data: alterationInputData) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  const manufacturerList: Manufacturer[] = await getAllManufacturers();
  const deviceList: Device[] = await getAllDevices();

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

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
    const response = await axios.post(`${apiUrl}/repair`, repairData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('New repair added: ', response.data);
  } catch (error) {
    console.error('Error adding repair: ', error);
  }
};

export { postRepair };
