
import { useNavigate } from "react-router-dom";
import { SiTrello } from "react-icons/si";


export function WelcomePage() {
    const navigate = useNavigate();

    const kanbanColumns = [
        { title: "To Do", emoji: "📝", color: "bg-blue-100" },
        { title: "In Progress", emoji: "✏️", color: "bg-yellow-100" },
        { title: "Done", emoji: "✅", color: "bg-green-100" }
    ];

    return (
        <div className="min-h-screen  flex flex-col">
            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-0 py-12">
                {/* Logo/Title */}
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <SiTrello size={44} />
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                            Boardly
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-md md:max-w-lg mx-auto leading-relaxed mt-4">
                        Простой инструмент для организации задач по принципу канбан. Создавайте доски, перемещайте карточки и следите за прогрессом.
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-gray-800 text-white font-medium rounded-lg shadow hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                    Начать работать
                </button>

                {/* Kanban Preview */}
                <div className="mt-16 flex flex-col sm:flex-row gap-4">
                    {kanbanColumns.map((column, index) => (
                        <div
                            key={index}
                            className={`w-48 h-40 ${column.color} rounded-lg shadow flex flex-col overflow-hidden border-t-4 ${index === 0 ? 'border-blue-400' : index === 1 ? 'border-yellow-400' : 'border-green-400'}`}
                        >
                            <div className="p-3 border-b border-gray-200">
                                <h3 className="font-medium text-gray-800">{column.title}</h3>
                            </div>
                            <div className="flex-grow p-3 flex items-center justify-center">
                                <span className="text-4xl">{column.emoji}</span>
                            </div>
                            <div className="p-2 bg-white bg-opacity-50 text-xs text-gray-500">
                                {index === 0 && "Новые задачи"}
                                {index === 1 && "В работе"}
                                {index === 2 && "Завершенные"}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Boardly. Просто и удобно.
            </footer>
        </div>
    );
}
