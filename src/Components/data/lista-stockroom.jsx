import api from "@/axios/config";

export async function getStockRooms() {
  try {
    const response = await api.get('/stockroom');
    return response.data.data; // Assumindo que o array de salas está em `data.data`
  } catch (error) {
    console.error("Erro ao buscar salas de estoque", error);
    return []; // Retorna um array vazio em caso de erro
  }
}
