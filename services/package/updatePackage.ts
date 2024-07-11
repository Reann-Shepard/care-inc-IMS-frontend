import { Package } from '@/entities/Package';
import axios from 'axios';

// Patch
const updatePackage = async (id: number, data: Partial<Package>) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.patch(`${apiUrl}/package/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return [];
  }
};

export { updatePackage };
