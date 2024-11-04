import api from "@/axios/config";

// Função para obter a lista básica de receitas
export async function getReceitas({ data = "", cpf = "" } = {}) {
  try {
    const response = await api.get('/Prescription', {
      params: { data, cpf },
    });
    const { data: receitasData } = response.data;

    const receitas = receitasData.map((item) => ({
      id: item.id.toString(),
      name: item.patientName,
      cpf: item.cpf,
      nomeMedico: item.doctorName,
    }));

    return receitas;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  }
}

// Função para obter detalhes completos de uma receita, incluindo itens, por ID
export async function getItensReceitaById(id) {
  try {
    const response = await api.get(`/Prescription/${id}`); // Endpoint correto para obter detalhes da receita
    const { data } = response.data; // Assumindo que os dados estão em response.data.data

    // Formata a data para o formato DD/MM/YYYY
    const formattedDate = new Date(data.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Formata os dados para corresponder à estrutura esperada
    const receitaDetalhada = {
      id: data.id.toString(),
      name: data.patientName,
      cpf: data.cpf,
      nomeMedico: data.doctorName,
      CRM: data.crm || "CRM não disponível",
      data: formattedDate || "Data não disponível",
      local: data.local || "Local não disponível",
      itens: data.items.map((item) => ({
        id: item.id,
        nomeRemedio: item.medicamentName,
        qtd: item.prescribedQuantity,
        descricao: `${item.medicamentDosage}${item.medicamentMeasure}`,
        observacao: item.observation || "Nenhuma observação",
      })),
    };

    return receitaDetalhada;
  } catch (error) {
    console.error("Erro ao buscar itens da receita:", error);
    return null; // Retorna null em caso de erro
  }
}