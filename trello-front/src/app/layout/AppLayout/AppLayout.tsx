import { Outlet } from 'react-router-dom';
import {Header} from "../header";
import {Footer} from "../footer";

export const AppLayout = () => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex">
            <Outlet /> {/* Дочерние роуты рендерятся здесь */}
        </main>
        <Footer />
    </div>
);