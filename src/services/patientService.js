import axios from 'axios';

const API_URL = 'http://157.230.224.194:5001/api'; 
export const createPatient = async (patient) => {
    try {
        const patientData = {
            Name: patient.name,
            CPF: patient.cpf,
            BirthDay: patient.birthDate ? new Date(patient.birthDate).toISOString() : null,
            PhoneNumber: patient.phone,
            Mail: patient.email,
            Observations: patient.observations
        };

        const response = await axios.post(`${API_URL}/Patient`, patientData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
        });
        
        return response;
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        throw error;
    }
};
