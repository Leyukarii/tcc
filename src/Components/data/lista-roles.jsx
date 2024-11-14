import api from "@/axios/config";

export async function getRoles() {
  try {
    const response = await api.get('/role');
    const roles = response.data.data.map(role => ({
      id: role.id,       
      name: role.name      
    }));
    return roles;
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
    return []; 
  }
}
