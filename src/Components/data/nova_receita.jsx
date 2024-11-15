import api from '@/axios/config';

export async function createPrescription(prescriptionData) {
    try {
        const response = await api.post('/prescription', {
            employeeId: prescriptionData.employeeId,
            cpf: prescriptionData.cpf,
            local: prescriptionData.local,
            items: prescriptionData.items 
        });
        return response;
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        throw error;
    }
}
