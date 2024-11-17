import api from '@/axios/config';

export async function validaCrm(crm) {
    try {
        const response = await api.get(`/Employee/ValidateCrm?crm=${crm}`);
        console.log("Resposta do backend para CRM:", response.data); 
        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("CRM inválido", error);
        return null;
    }
}

