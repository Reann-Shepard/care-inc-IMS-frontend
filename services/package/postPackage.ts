import { Package } from '@/entities/Package';
import apiClient from '../auth/axios-interceptor';

const postPackage = async (data: Package) => {
  try {
    const response = await apiClient.post('/package', data);
    console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed posting package data: ', error);
    return [];
  }
};

export { postPackage };
