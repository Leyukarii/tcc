import api from '@/axios/config';

export async function getItensEstoque({ name = "" } = {}) {
  try {
    const response = await api.get('/StockRoom/AvailableMedicaments', {
      params: { medicamentName: name }, // Use o parâmetro correto
    });
    const { data } = response.data;

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
    return [];
  }
}
