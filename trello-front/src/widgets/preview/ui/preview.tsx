
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useKanban} from "../../../features/kanban/model/use-kanban.tsx";

export const Preview = () => {
    const {kanbans} = useKanban()
    const navigate = useNavigate()
    const [showAll, setShowAll] = useState(false)

    const handleRedirect = (kanbanId: string) => {
        navigate(`/kanban/${kanbanId}`)
    }

    const displayedKanbans = showAll ? kanbans : kanbans.slice(0, 3)

    return (
        <div className={'flex flex-col justify-center items-center gap-6'}>
            <div>
                <p className={'text-2xl font-semibold text-gray-800'}>Ваши последние работы</p>
            </div>

            <div className={'flex flex-wrap justify-center gap-4 max-w-4xl p-6 bg-white rounded-xl shadow-md border border-gray-200'}>
                {displayedKanbans.length > 0 ? (
                    displayedKanbans.map(kanban => (
                        <div
                            key={kanban.id}
                            onClick={() => handleRedirect(kanban.id)}
                            className={'flex flex-col gap-3 bg-violet-100 hover:bg-violet-200 transition-colors rounded-xl p-4 cursor-pointer min-w-[250px] max-w-[300px] border border-violet-200 shadow-sm hover:shadow-md'}
                        >
                            <h3 className={'font-medium text-violet-800 text-lg truncate'}>{kanban.title}</h3>
                            <div className={'text-sm text-gray-600'}>
                                <p>Создана: {format(kanban.createdAt, 'dd.MM.yyyy', {locale: ru})}</p>
                                <p>Изменена: {format(kanban.updatedAt, 'dd.MM.yyyy', {locale: ru})}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={'text-gray-500 italic'}>У вас пока нет канбан-досок</p>
                )}
            </div>

            {kanbans.length > 3 && (
                <div>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={'px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-full transition-colors shadow hover:shadow-md font-medium'}
                    >
                        {showAll ? 'Скрыть' : `Показать все (${kanbans.length})`}
                    </button>
                </div>
            )}
        </div>
    )
}
