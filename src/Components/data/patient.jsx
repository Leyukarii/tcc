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

  if(data.role === "patient"){
    const datas = {
      name: data.name,
      cpf: data.cpf,
      birthDay: data.birthDay,
      phoneNumber: data.phoneNumber,
      mail: data.mail,
      observations: data.observations,
    };
    console.log(datas)

    try {
      const response = await api.put('/Patient', datas);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro ao atualizar o cadastro:", error);
      return { success: false, message: error.response?.data?.message || "Erro desconhecido" };
    }

  }else{

    const id = data.id;

    const datas = {
      birthDate: data.dataNascimento,
      cpf: data.cpf,
      crm: data.crm,
      employeeId: data.employeeId,
      mail: data.mail,
      responsibleMail: data.emailResponsavel,
      name: data.name,
      phone: data.phoneNumber,
      tagCode: data.tagCode,
      roleId: data.roleId
    };

    console.log(datas)
    try {
      const response = await api.put(`/Employee/${id}`, datas);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro ao atualizar o cadastro:", error);
      return { success: false, message: error.response?.data?.message || "Erro desconhecido" };
    }

  }

}
