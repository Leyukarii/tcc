import api from "@/axios/config";

export async function getItensRemedios() {
  try {
    const response = await api.get('/Medicament'); // Substitua pelo endpoint correto
    const rawRemedios = response.data.data; // Assumindo que os dados estão em response.data.data

    // Transformando os dados no formato desejado
    const remedios = rawRemedios.map((item) => {
      const id = Object.keys(item)[0]; // Pega o ID
      const fullName = item[id]; // Nome completo, como "Paracetamol 500mg"
      
      // Separar nome, dosagem e unidade de medida
      const nameMatch = fullName.match(/^([a-zA-Z\s]+)\s+(\d+)([a-zA-Z]+)$/);
      
      if (nameMatch) {
        const [, name, dosagem, uniMedida] = nameMatch;
        return { id, name, dosagem, uniMedida };
      } else {
        console.error(`Formato inesperado para o item: ${fullName}`);
        return { id, name: fullName, dosagem: "", uniMedida: "" };
      }
    });

    return remedios;
  } catch (error) {
    console.error("Erro ao buscar itens de remédios:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}
