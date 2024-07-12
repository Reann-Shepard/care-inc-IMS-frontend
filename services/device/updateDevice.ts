import { Device } from '@/entities/Device';
import axios from 'axios';

// Patch
const updateDevice = async (id: number, data: Partial<Device>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.patch(`${apiUrl}/device/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Device data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Device data: ', error);
    return [];
  }
};

export { updateDevice };
