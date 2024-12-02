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

export async function deletePage(id){
  console.log(id)
  try {
      const response = await api.delete(`/Page/${id}`);
      return response.data;
  } catch (error) {
      console.error("Erro ao deletar a sala de estoque", error);
      throw error.response?.data || { message: "Erro desconhecido ao deletar a sala de estoque" };
  }
}
