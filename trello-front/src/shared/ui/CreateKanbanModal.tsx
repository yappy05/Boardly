// components/CreateKanbanModal.tsx
import {useState} from "react";

// components/CreateKanbanModal.tsx
interface CreateKanbanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
}

export const CreateKanbanModal: React.FC<CreateKanbanModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        onSubmit
                                                                    }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title);
        setTitle('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Создать новую доску</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Название доски
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Введите название"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Создать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};