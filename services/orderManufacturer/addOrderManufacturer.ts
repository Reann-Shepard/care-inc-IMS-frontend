import axios from 'axios';

const updateOrderManufacturerById = async (id: number, updateData: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.patch(
      `${apiUrl}/order-manufacturer/${id}`,
      updateData,
    );
    return response.data;
  } catch (e) {
    console.error('Failed updating Order Manufacturer data: ', e);
    return null;
  }
};

export { updateOrderManufacturerById };
