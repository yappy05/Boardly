import {useEffect, useState} from "react";
import type { RegisterDto } from "../../../shared/api/dto/register.dto.ts";
import {getUserApi, registerApi} from "../api";
import { useNavigate } from "react-router-dom";
import { loginApi, logoutApi } from "../api/auth.api.ts";
import type { LoginDto } from "../../../shared/api/dto/login.dto.ts";
import type {UserType} from "../../../shared/api/types/user.type.ts";

export const useAuth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserApi()
      setUser(response)
    }
    fetchUser()
  }, []);

  const register = async (dto: RegisterDto) => {
    const response = await registerApi(dto);
    localStorage.setItem("accessToken", response.accessToken);
    setUser(await getUserApi())
    navigate("/home");
    return response;
  };

  // Заглушка для выхода
  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("accessToken");
    setUser(null)
    navigate("/");
  };

  const login = async (dto: LoginDto) => {
    const response = await loginApi(dto);
    localStorage.setItem("accessToken", response.accessToken);
    setUser(await getUserApi())
    navigate("/home");
  };

  return { user, logout, register, login };
};
