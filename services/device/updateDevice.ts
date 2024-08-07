import { Device } from '@/entities/Device';
import apiClient from '../auth/axios-interceptor';

// Patch
const updateDevice = async (sn: string, data: Partial<Device>) => {
  try {
    const response = await apiClient.patch(`/device/${sn}`, data);
    console.log('Device data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed updating Device data: ', error);
    return [];
  }
};

const removeDevicePackageId = async (sn: string) => {
  try {
    const response = await apiClient.patch(
      `/device/${sn}/remove-package-id-null`,
    );
    return response.data;
  } catch (error) {
    console.error('Failed updating Device data: ', error);
    return [];
  }
};

export { updateDevice, removeDevicePackageId };
