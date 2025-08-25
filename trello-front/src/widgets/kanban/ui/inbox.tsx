import {useKanban} from "../../../features/kanban/model/use-kanban.tsx";
import {useEffect, useRef, useState} from "react";
import {useColumn} from "../../../features/column/model/use-column.tsx";
import {ColumnContainer} from "../../../features/column/ui/ColumnContainer.tsx";

export const Inbox = () => {

    const {currentKanban} = useKanban()
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {addTask} = useColumn('INBOX')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsInputOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAddTask = async () => {
        if (inputValue.trim()) {
            console.log('Добавляем задачу:', inputValue);
            if (!currentKanban) return
            await addTask(currentKanban.id, {status: 'INBOX', title: inputValue, kanbanId: currentKanban.id})
            // Здесь логика добавления задачи
            setInputValue('');
        }
        setIsInputOpen(false);
    };

    const handleCancel = () => {
        setIsInputOpen(false);
    };

    return (
        <div className="flex flex-1 flex-col max-w-[300px] min-w-[200px] w-1/5 bg-gray-100 p-3 rounded-lg shadow-sm">
            <div className="flex flex-1 flex-col">
                {/* Область инпута */}
                <div
                    ref={wrapperRef}
                    className="bg-white p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    <input
                        type="text"
                        placeholder="новая задача..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onClick={() => setIsInputOpen(true)}
                        className="w-full outline-0 text-sm placeholder:text-gray-400 text-gray-800"
                    />

                    {/* Кнопки (появляются при открытии) */}
                    {isInputOpen && (
                        <div className="flex justify-center gap-2 mt-3 animate-in fade-in duration-200">
                            <button
                                onClick={handleAddTask}
                                disabled={!inputValue.trim()}
                                className="p-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600
                         disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Добавить
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-md
                         hover:bg-gray-300 transition-colors"
                            >
                                Отмена
                            </button>
                        </div>
                    )}
                </div>
                <ColumnContainer columnStatus={'INBOX'}/>
            </div>
        </div>
    );
}