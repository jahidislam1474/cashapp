import axios from 'axios';

export const fetchRoutes = async () => {
    try {
        const response = await axios.get('https://zplay.superice.cloud/api/routes'); // Replace with your API URL
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        return [];
    }
};
