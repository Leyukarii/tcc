import api from "@/axios/config";

export async function createEmployee(employeeData) {
  try {
    const response = await api.post('/employee',  {
      birthDate: employeeData.birthDate, // Certifique-se de que está em formato ISO
      cpf: employeeData.cpf,
      crm: employeeData.crm, 
      employeeId: employeeData.employeeId,
      mail: employeeData.email,
      responsibleMail: employeeData.responsibleMail,
      name: employeeData.name,
      phone: employeeData.phone,
      tagCode: employeeData.tagCode,
      roleId: parseInt(employeeData.roleId, 10), 
    });
    return response;
  } catch (error) {
    console.error("Erro ao criar funcionário:", error);
    throw error;
  }
}


