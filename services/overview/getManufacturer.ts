import axios from 'axios';

const getAllManufacturers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/manufacturer`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return [];
  }
};

const getThisManufacturerName = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/manufacturer/${String(id)}`);
    const manufacturerName = response.data.name;
    return manufacturerName;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return [];
  }
};

export { getAllManufacturers, getThisManufacturerName };
