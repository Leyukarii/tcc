import api from '@/axios/config'; 

export async function buscarPacientePorCpf(cpf) {
  try {
    const cpfNumerico = cpf.replace(/\D/g, ''); // Remove pontuação
    console.log("Buscando paciente com CPF:", cpfNumerico);

    const response = await api.get(`/patient?cpf=${cpfNumerico}`);
    console.log("Resposta da API:", response.data);

    if (response.data && Array.isArray(response.data.data)) {
      const pacienteEncontrado = response.data.data.find(
        paciente => paciente.cpf.replace(/\D/g, '') === cpfNumerico // Remove pontuação para comparar
      );
      return pacienteEncontrado || null;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    return null;
  }
}
