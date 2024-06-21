import axios from 'axios';

const getThisOrderCustomer = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/orderCustomer/${String(id)}`);
    console.log('OrderCustomer Id-', id, ' data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching OrderCustomer Id-', id, ' data: ', error);
    return [];
  }
};

export { getThisOrderCustomer };