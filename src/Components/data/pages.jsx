import api from "@/axios/config";

export async function createPage(pageData){
    try{
        const response = await api.post('/pages', {
            name: pageData.name,
            description: pageData.description,
        });
        return response;
    }catch (error) {
        console.error("Erro ao criar página", error);
        throw error;
    }
}