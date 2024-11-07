import api from "@/axios/config";

export async function login(loginData){
    try{
        const response = await api.post('/auth/login', {
            mail: loginData.mail,
            password: loginData.password
        });
        return response;
    }catch (error){
        console.error("Erro ao tentar logar", error);
        throw error;
    }
}
