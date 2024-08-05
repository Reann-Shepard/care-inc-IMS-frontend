// Importing axios to make API requests
import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

/**
 * Function to fetch all inventory data from the server.
 *
 * @returns An array of inventory data if the request is successful, or an empty array if it fails.
 */

// const getAllInventory = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL; // API URL from environment variables
//   const token = localStorage.getItem('access_token'); // Access token from local storage

//   if (!apiUrl) {
//     // Check if API URL is defined
//     console.error('API URL is not found'); // Log error if API URL is not found
//     return []; // Return empty array if API URL is not found
//   }

//   try {
//     // Making a GET request to the server to fetch all inventory data
//     const response = await axios.get(`${apiUrl}/inventory`, {
//       headers: {
//         Authorization: `Bearer ${token}`, // Send the access token with the request
//       },
//     });
//     console.log('Inventory data: ', response.data); // Log the inventory data
//     return response.data; // Return the inventory data
//   } catch (error) {
//     console.error('Failed fetching Inventory data: ', error); // Log error if there is an error fetching inventory data
//     return []; // Return empty array if there is an error fetching inventory data
//   }
// };

const getAllInventory = async () => {
  try {
    // Making a GET request to the server to fetch all inventory data
    const response = await apiClient.get('/inventory');
    console.log('Inventory data: ', response.data); // Log the inventory data
    return response.data; // Return the inventory data
  } catch (error) {
    console.error('Failed fetching Inventory data: ', error); // Log error if there is an error fetching inventory data
    return []; // Return empty array if there is an error fetching inventory data
  }
};

export { getAllInventory }; // Export the getAllInventory function to be used in other files
