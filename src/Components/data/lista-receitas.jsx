import api from "@/axios/config";


// Função para obter as receitas formatadas
export async function getReceitas() {
  try {
    const response = await api.get('/Prescription'); // Substitua pelo endpoint correto
    const { data } = response.data; // Assumindo que os dados estão em response.data.data

    // Formata os dados para corresponder à estrutura esperada
    const receitas = data.map((item) => ({
      id: item.id.toString(),
      name: item.patientName,
      cpf: item.cpf,
      nomeMedico: item.doctorName,
      CRM: "faltou", // Caso a API não forneça o CRM, você pode deixá-lo vazio ou adicionar um valor padrão
      data: "faltou colocar a data na API", // Mesma lógica para a data
      local: "faltou colocar o local na API", // Mesma lógica para o local
      itens: [] // Se houver itens na API, você pode mapeá-los aqui, caso contrário, deixe vazio
    }));

    return receitas;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  }
}

export async function getItensReceitaById(id) {
    try {
      const response = await api.get(`/Prescription/GetPrescriptionItems/${id}`); // Substitua pelo endpoint correto
      const { data } = response.data; // Assumindo que os dados estão em response.data.data

      const itens = data.map((item) => ({
        id: item.id,
        nomeRemedio: item.name,
        qtd: item.quantity,
        descricao: `${item.dosage}${item.measure}`
      }));
  
      return itens;
    } catch (error) {
      console.error("Erro ao buscar itens da receita:", error);
      return []; // Retorna uma lista vazia em caso de erro
    }
  }