import api from "@/axios/config";

export async function createPage(pageData){
    try{
        const response = await api.post('/page', {
            name: pageData.name,
            description: pageData.description,
        });
        return response;
    }catch (error) {
        console.error("Erro ao criar página", error);
        throw error;
    }
}

export async function getPages() {
    try {
        const response = await api.get('/page');
        return response.data; // Retorna o conteúdo de 'data' diretamente
    } catch (error) {
        console.error("Erro ao buscar páginas", error);
        throw error;
    }
}