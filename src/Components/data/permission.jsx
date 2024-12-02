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

