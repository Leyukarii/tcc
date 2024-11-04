import api from "@/axios/config";

// Função para obter os cargos (roles) do sistema
export async function getRoles() {
  try {
    const response = await api.get('/Role'); // Substitua pelo endpoint correto se necessário
    const { data } = response.data;

    // Retorna os dados formatados apenas com id e name
    const roles = data.map((role) => ({
      id: role.id,
      name: role.name,
    }));

    return roles;
  } catch (error) {
    console.error("Erro ao buscar cargos:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}
