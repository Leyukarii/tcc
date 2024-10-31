import axios from 'axios';

const API_URL = 'http://157.230.224.194:5001/api'; 

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${API_URL}/Employee`, employeeData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        throw error;
    }
};
