import api from "@/axios/config";

// Função original para obter todos os dados
export async function getItensRemedios() {
  try {
    const response = await api.get('/Medicament'); // Substitua pelo endpoint correto
    const { data } = response.data; // Assumindo que os dados estão em response.data.data

    // Formata os dados para corresponder à estrutura esperada
    const remedios = data.map((item) => ({
      id: item.id,
      description: item.description,
      dosage: item.dosage,
      measure: item.measure,
    }));

    return remedios;
  } catch (error) {
    console.error("Erro ao buscar itens de remédios:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}

// Nova função para obter apenas ID e descrição formatada
export async function getItensRemediosFormatados() {
  try {
    const response = await api.get('/Medicament'); // Substitua pelo endpoint correto
    const { data } = response.data;

    // Formata os dados para retornar apenas id e descrição concatenada
    const remediosFormatados = data.map((item) => ({
      id: item.id,
      description: `${item.description} ${item.dosage}${item.measure}`,
    }));

    return remediosFormatados;
  } catch (error) {
    console.error("Erro ao buscar itens de remédios formatados:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}
