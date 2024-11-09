import api from "@/axios/config"; // Importação do Axios

export async function createRole(roleData) {
  try {
    const response = await api.post('/role', {
      name: roleData.name,
      description: roleData.description,
      permissionIds: roleData.permissionIds
    });
    return response;
  } catch (error) {
    console.error("Erro ao criar cargo:", error.response?.data || error.message);
    throw error;
  }
}
