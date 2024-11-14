import api from '@/axios/config';

export async function buscarMedicoPorCrm(crm) {
    try {
        const response = await api.get(`/employee?crm=${crm}`);
        console.log("Resposta do backend para CRM:", response.data); // Log para verificação
        if (response.data && response.data.data) {
            return response.data.data.find(medico => medico.crm === crm) || null;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar médico:", error);
        return null;
    }
}
