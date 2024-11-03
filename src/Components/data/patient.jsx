import api from "@/axios/config";

export async function createPatient(patientData) {
  try {
    const response = await api.post('/patient', {
      name: patientData.name,
      cpf: patientData.cpf,
      birthDay: patientData.birthDate,  // Certifique-se de formatar para ISO se necessário
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
