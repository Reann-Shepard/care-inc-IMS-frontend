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

// const removeDevicePackageId = async (id: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.patch(
//       `${apiUrl}/device/${id}/remove-package-id-null`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Failed updating Device data: ', error);
//     return [];
//   }
// };

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
