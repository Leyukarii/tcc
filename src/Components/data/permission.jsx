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
export async function deleteStockRoom(selectedRoomID) {
    console.log(selectedRoomID); // Exibe o ID da sala a ser deletada
    try {
        const response = await api.delete(`/StockRoom/${selectedRoomID}`);
        return response.data; // Retorna apenas os dados da resposta, assumindo que o `success` e `message` estão nela
    } catch (error) {
        console.error("Erro ao deletar a sala de estoque", error);
        // Lança o erro para que possa ser tratado na função que chamou
        throw error.response?.data || { message: "Erro desconhecido ao deletar a sala de estoque" };
    }
}
