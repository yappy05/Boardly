import { http } from "../../../shared/api/http.ts";
import type { UserType } from "../../../shared/api/types/user.type.ts";

export const getUserApi = async (): Promise<UserType> => {
  try {
    const response = await http.get<UserType>("/user/find-by-req");
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number } };

    if (axiosError.response?.status === 401) {
      throw new Error("Не авторизован");
    }
    if (axiosError.response?.status === 404) {
      throw new Error("Пользователь не найден");
    }
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      throw new Error("Ошибка сервера");
    }

    throw new Error("Ошибка при получении данных пользователя");
  }
};
