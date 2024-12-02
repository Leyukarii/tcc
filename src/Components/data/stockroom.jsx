import api from "@/axios/config";

export async function createStockRoom(stockroomData){
    try{
        const response = await api.post('/stockroom', {
            name: stockroomData.name,
            address: stockroomData.address,
            uniqueId: stockroomData.uniqueId, 
            inStockItems: stockroomData.inStockItems || [] 
        });
        return response;
    }catch(error){
        console.error("Erro ao cadastrar sala", error);
        throw error
    }
}

export async function getStockRooms() {
    try {
        const response = await api.get('/stockroom'); // Confirme que o endpoint está correto
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar salas:", error);
        throw error;
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
