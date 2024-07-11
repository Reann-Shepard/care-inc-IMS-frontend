import { Device } from '@/entities/Device';
import axios from 'axios';

// Patch
const updateDevice = async (id: number, data: Partial<Device>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.patch(`${apiUrl}/device/${id}`, data);
    console.log('Device data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Device data: ', error);
    return [];
  }
};

export { updateDevice };
