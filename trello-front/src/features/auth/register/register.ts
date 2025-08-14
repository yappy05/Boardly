import {useNavigate} from "react-router-dom";
import type {RegisterDto} from "../../../shared/api/dto/register.dto.ts";
import {registerApi} from "../api";

export const useRegister = () => {
    const navigate = useNavigate()

    const register = async (dto: RegisterDto) => {
        try {
            const {accessToken} = await registerApi(dto);
            localStorage.setItem('accessToken', accessToken )
            navigate('/home');
        } catch (error) {
            throw new Error('Регистрация не удалась', {cause: error});
        }
    };
    return {register}
}