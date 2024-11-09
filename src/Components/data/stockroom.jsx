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