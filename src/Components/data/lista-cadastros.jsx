import api from "@/axios/config"; // Certifique-se de que o caminho está correto

// Função para obter todos os cadastros
export async function getCadastros() {
  try {
    const response = await api.get('/Employee/GetPersons'); // Substitua '/Employee/GetPersons' pelo endpoint correto
    const { data } = response.data;

    // Mapeia os dados para a estrutura esperada
    const cadastros = data.map((item) => ({
      id: item.id,
      uniqueId: item.uniqueId,
      name: item.name,
      cpf: item.cpf,
      role: item.role,
    }));

    return cadastros;
  } catch (error) {
    console.error("Erro ao buscar cadastros:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
}

// Função para obter os detalhes de um cadastro específico pelo ID
export async function getCadastroById(cpf,role) {
    if(role === 'patient'){
        try {
          const response = await api.get(`/Patient/${cpf}`); // Substitua '/Employee/GetPerson/' pelo endpoint correto
          const data = response.data.data;
      
          // Mapeia os dados para o formato completo esperado
          const cadastroDetalhado = {
            id: data.id,
            name: data.name,
            cpf: data.cpf,
            role: role,
            email: data.mail,
            dataNascimento: data.birthDay,
            telefone: data.phoneNumber,
            CRM: '',
            emailResponsavel: '',
            obs: data.observations
          };
      
          return cadastroDetalhado;
        } catch (error) {
          console.error(`Erro ao buscar detalhes do cadastro com ID ${id}:`, error);
          return null; // Retorna null em caso de erro
        }
    }else{
        try {
            const response = await api.get(`/Employee/${cpf}`); // Substitua '/Employee/GetPerson/' pelo endpoint correto
            const data = response.data.data;
        
            // Mapeia os dados para o formato completo esperado
            const cadastroDetalhado = {
              id: data.id,
              uniqueId: data.uniqueId,
              name: data.name,
              cpf: data.cpf,
              role: role,
              email: data.mail,
              dataNascimento: data.birthDate,
              telefone: data.phone,
              CRM: data.crm,
              emailResponsavel: data.responsibleMail,
            };
        
            return cadastroDetalhado;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do cadastro com ID ${id}:`, error);
            return null; // Retorna null em caso de erro
          }
    }
}


export async function deleteCadastro(id,role){

    if(role === 'patient'){
        try {
            const response = await api.delete(`/Patient/${id}`); // Substitua '/Employee/' pelo endpoint correto de delete
            if (response.status === 200) {
              console.log(`Cadastro com ID ${id} deletado com sucesso.`);
              return { success: true, message: "Cadastro deletado com sucesso." };
            } else {
              console.error(`Erro ao deletar cadastro com ID ${id}:`, response.statusText);
              return { success: false, message: "Erro ao deletar o cadastro." };
            }
          } catch (error) {
            console.error(`Erro ao tentar deletar o cadastro com ID ${id}:`, error);
            return { success: false, message: "Erro ao tentar deletar o cadastro." };
        }

    }else{
        try {
            const response = await api.delete(`/Employee/${id}`); // Substitua '/Employee/' pelo endpoint correto de delete
            if (response.status === 200) {
              console.log(`Cadastro com ID ${id} deletado com sucesso.`);
              return { success: true, message: "Cadastro deletado com sucesso." };
            } else {
              console.error(`Erro ao deletar cadastro com ID ${id}:`, response.statusText);
              return { success: false, message: "Erro ao deletar o cadastro." };
            }
          } catch (error) {
            console.error(`Erro ao tentar deletar o cadastro com ID ${id}:`, error);
            return { success: false, message: "Erro ao tentar deletar o cadastro." };
        }
    }


}

