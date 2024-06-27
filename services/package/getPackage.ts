import axios from 'axios';

const getAllPackages = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/package`);
    console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return [];
  }
};

const getAllPackagesSortedFiltered = async (sortBy = '', filterBy = {}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/package/sorted-filtered`, {
      params: {
        sortBy,
        ...filterBy,
      },
    });
    console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return [];
  }
};

export { getAllPackages, getAllPackagesSortedFiltered };
