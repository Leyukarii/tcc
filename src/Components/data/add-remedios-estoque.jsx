import api from "@/axios/config";

export async function createStockRoomMedicament(stockroomMedicamentData) {
    try {
        const response = await api.post('/StockRoom/InsertItems', {
            stockRoomId: stockroomMedicamentData.stockRoomId,
            medicamentId: stockroomMedicamentData.medicamentId,
            expirationDate: stockroomMedicamentData.expirationDate,
            quantity: stockroomMedicamentData.quantity,
            employeeId: stockroomMedicamentData.employeeId 
        });
        return response;
    } catch (error) {
        console.error("Erro ao adicionar remédio:", error.response?.data || error.message);
        throw error;
    }
}
