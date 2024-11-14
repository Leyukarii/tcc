import api from '@/axios/config';

export async function createPrescription(prescriptionData) {
    try {
        const response = await api.post('/prescription', prescriptionData);
        return response;
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        throw error;
    }
}