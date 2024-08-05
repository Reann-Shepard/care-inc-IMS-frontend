import { Device } from '@/entities/Device';
import apiClient from '../auth/axios-interceptor';

// Patch
const updateDevice = async (id: number, data: Partial<Device>) => {
  try {
    const response = await apiClient.patch(`/device/${id}`, data);
    console.log('Device data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed updating Device data: ', error);
    return [];
  }
};

export { updateDevice };
