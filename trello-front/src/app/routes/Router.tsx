import {Route, Routes} from "react-router-dom";
import {LoginPage, RegisterPage} from "../../pages/auth";
import {WelcomePage} from "../../pages/welcome";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}