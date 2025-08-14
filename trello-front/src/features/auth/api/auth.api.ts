import type { RegisterDto } from "../../../shared/api/dto/register.dto.ts";
import type { AuthResponse } from "../../../shared/api/types/auth-response.type.dto.ts";
import { http } from "../../../shared/api/http.ts";
import type { LoginDto } from "../../../shared/api/dto/login.dto.ts";

export const registerApi = async (dto: RegisterDto): Promise<AuthResponse> => {
  try {
    const response = await http.post<AuthResponse>("/auth/register", dto);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 409) {
      throw new Error("Пользователь с таким email уже существует");
    }
    if (axiosError.response?.status === 400) {
      throw new Error("Неверные данные для регистрации");
    }
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      throw new Error("Ошибка сервера. Попробуйте позже");
    }
    throw new Error(
      "Ошибка при регистрации. Проверьте подключение к интернету"
    );
  }
};

export const loginApi = async (dto: LoginDto): Promise<AuthResponse> => {
  try {
    const response = await http.post<AuthResponse>("/auth/login", dto);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 401) {
      throw new Error("Неверный email или пароль");
    }
    if (axiosError.response?.status === 400) {
      throw new Error("Неверный формат данных");
    }
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      throw new Error("Ошибка сервера. Попробуйте позже");
    }
    throw new Error("Ошибка при входе. Проверьте подключение к интернету");
  }
};

export const logoutApi = async (): Promise<void> => {
  try {
    await http.post("/auth/logout");
  } catch (error: unknown) {
    const axiosError = error as { response?: { status?: number } };
    if (axiosError.response?.status === 401) {
      // Пользователь уже не авторизован, считаем это успешным выходом
      return;
    }
    if (axiosError.response?.status && axiosError.response.status >= 500) {
      throw new Error("Ошибка сервера при выходе");
    }
    // Для logout не критично, если API упал - все равно выходим
    console.warn("Ошибка при выходе:", error);
  }
};
