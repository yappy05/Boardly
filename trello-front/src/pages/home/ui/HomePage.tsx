import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const HomePage = () => {
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Сохраняем токен в localStorage
            localStorage.setItem('accessToken', token);

            // Очищаем URL (убираем ?token=...)
            window.history.replaceState({}, document.title, window.location.pathname);

            // Можно показать уведомление об успешной авторизации
            console.log('Успешная авторизация через Google!');
        }
    }, [searchParams]);
    return (
        <div>
            <p>Hello HomePAge</p>
        </div>
    )
}