import api from '@/axios/config';

export async function buscarPacientePorCpf(cpf) {
    try {
        const response = await api.get(`/patient?cpf=${cpf}`);
        console.log("Resposta do backend:", response.data); // Log para verificação

        if (response.data && Array.isArray(response.data.data)) {
            // Filtra pelo CPF exato no frontend, caso o backend retorne múltiplos pacientes
            const pacienteEncontrado = response.data.data.find(paciente => paciente.cpf === cpf);
            return pacienteEncontrado || null; // Retorna o paciente encontrado ou null se não houver
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        return null;
    }
}
