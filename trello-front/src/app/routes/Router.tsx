import {Route, Routes} from "react-router-dom";
import {LoginPage, RegisterPage} from "../../pages/auth";
import {WelcomePage} from "../../pages/welcome";
import {HomePage} from "../../pages/home";
import {AppLayout} from "../layout";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<AppLayout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    )
}