import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Preview} from "../../../widgets/preview/ui/preview.tsx";
import {CreateKanbanModal} from "../../../shared/ui/CreateKanbanModal.tsx";
import {useKanban} from "../../../features/kanban/model/useKanban.ts";

export const HomePage = () => {
    const [searchParams] = useSearchParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { create } = useKanban()
    const navigate = useNavigate()

    const handleCreateKanban = async (title: string) => {
        const response = await create(title)
        console.log(response)
        setIsModalOpen(false)
    };

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('accessToken', token);
            window.history.replaceState({}, document.title, window.location.pathname);
            console.log('Успешная авторизация через Google!');
        }
    }, [searchParams]);

    return (
        <div className="flex-1 flex justify-center bg-gray-50 min-h-screen">
            <div className={'flex flex-col mt-20 gap-12 w-full max-w-6xl px-4'}>
                {/* Header Section */}
                <div className={'flex flex-col items-center text-center gap-4'}>
                    <h1 className={'text-4xl font-bold text-gray-900'}>Организуйте свои задачи</h1>
                    <p className={'text-gray-600 max-w-2xl'}>Создавайте канбан-доски для эффективного управления проектами и рабочими процессами</p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow hover:shadow-lg mt-4"
                    >
                        Создать новую доску
                    </button>
                </div>

                {/* Preview Section */}
                <div className={'flex justify-center'}>
                    <Preview/>
                </div>

                <CreateKanbanModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateKanban}
                />
            </div>
        </div>
    )
}