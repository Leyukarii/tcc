import api from '@/axios/config';

export async function carregarMedicamentos() {
    try {
        const response = await api.get('/medicament');
        console.log("Resposta do backend:", response.data); 
        return Array.isArray(response.data.data) ? response.data.data : []; // Garante que o retorno seja um array de medicamentos
    } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        return [];
    }
}
