import api from "@/axios/config";

export async function createPermission(permissionData) {
    try {
        const response = await api.post('/permission', permissionData);
        return response;
    } catch (error) {
        console.error("Erro ao cadastrar permissão", error);
        throw error;
    }
}


export async function getPermissions() {
    try {
        const response = await api.get('/permission'); 
        return response.data.data; 
    } catch (error) {
        console.error("Erro ao buscar permissões:", error);
        return [];
    }
}

export async function deletePermission(id){
    console.log(id)
  try {
      const response = await api.delete(`/Permission/${id}`);
      return response.data;
  } catch (error) {
      console.error("Erro ao deletar a permissão", error);
      throw error.response?.data || { message: "Erro desconhecido ao deletar permissao" };
  }
}
