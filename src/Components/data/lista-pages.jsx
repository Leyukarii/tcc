import api from "@/axios/config";

export async function getPages() {
  try {
    const response = await api.get('/page');
    return response.data.data; // Retorna apenas o array de páginas
  } catch (error) {
    console.error("Erro ao buscar páginas", error);
    return [];
  }
}
