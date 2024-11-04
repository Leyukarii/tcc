import api from "@/axios/config";

export async function createRole(roleData) {
  try {
    const response = await api.post('/role', {
      name: roleData.name,
      description: roleData.description
    });
    return response;
  } catch (error) {
    console.error("Erro ao criar cargo:", error);
    throw error;
  }
}
