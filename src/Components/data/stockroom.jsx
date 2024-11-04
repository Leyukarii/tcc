import api from "@/axios/config";

export async function createStockRoom(stockroomData){
    try{
        const response = await api.post('/stockroom', {
            name: stockroomData.name,
            address: stockroomData.address,
        });
        return response;
    }catch(error){
        console.error("Erro ao cadastrar sala", error);
        throw error
    }
}
