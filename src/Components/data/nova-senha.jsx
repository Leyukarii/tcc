import api from "@/axios/config";

export async function createNewPassword(passwordData) {
  try {
    const response = await api.post('/auth/UpdatePassword', {
      mail: passwordData.mail,
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
    });
    return response;
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    throw error;
  }
}
