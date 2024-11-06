import api from "@/axios/config";

export async function createPatient(patientData) {
  try {
    const response = await api.post('/patient', {
      name: patientData.name,
      cpf: patientData.cpf,
      birthDay: patientData.birthDate,
      phoneNumber: patientData.phone,
      mail: patientData.email,
      observations: patientData.observations,
    });
    return response;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
}

export async function updateCadastro(data) {
  try {
    const response = await api.put('/Patient', data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erro ao atualizar o cadastro:", error);
    return { success: false, message: error.response?.data?.message || "Erro desconhecido" };
  }
}
