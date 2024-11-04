import api from '@/axios/config'; // Certifique-se de que a configuração do axios está correta

export async function getItensEstoque({ name = "" } = {}) {
  try {
    const response = await api.get('/StockRoom/AvailableMedicaments', {
      params: { name },
    });
    const { data } = response.data; // Assumindo que os dados estão em response.data.data

    const cadastros = data.map((item) => ({
      id: item.id,
      name: item.medicamentName,
      dosagem: item.medicamentDosage,
      qtd: item.quantity.toString(),
      sala: item.stockRoomName,
    }));

    return cadastros;
  } catch (error) {
    console.error("Erro ao buscar itens de estoque:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}
