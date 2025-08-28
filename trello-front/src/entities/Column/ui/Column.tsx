import type { TaskResponse } from "../../task/model/types.ts";
import { Task } from "../../../features/task/ui/Task.tsx";
import type { ColumnStatus } from "../model/types.ts";
import { useState } from "react";

export interface ColumnProps {
  tasks: TaskResponse[];
  columnStatus: ColumnStatus;
  handleAddTask: (input: string) => void;
}

export const ColumnUi = ({
  tasks,
  columnStatus,
  handleAddTask,
}: ColumnProps) => {
  const [input, setInput] = useState("");

  const statusColors = {
    INBOX:
      "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-300 shadow-gray-100",
    TODO: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300 shadow-blue-100",
    INPROGRESS:
      "bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-300 shadow-orange-100",
    DONE: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-green-100",
  };

  const isInbox = columnStatus === "INBOX";

  return (
    <div className={"flex flex-1 flex-col gap-4"}>
      <div
        className={`text-center font-semibold py-3 px-4 rounded-xl border-2 shadow-sm ${
          statusColors[columnStatus]
        } ${isInbox ? "border-dashed" : ""}`}
      >
        <span className="text-sm uppercase tracking-wide flex items-center justify-center gap-2">
          {isInbox && <span className="text-lg">📥</span>}
          {isInbox ? "Черновик" : columnStatus}
        </span>
        <span className="block text-xs mt-1 opacity-75">
          {tasks.length} {isInbox ? "черновиков" : "задач"}
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={isInbox ? "Добавить черновик..." : "Добавить задачу..."}
          className={
            "flex-1 p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          }
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        <button
          onClick={() => {
            handleAddTask(input);
            setInput(""); // Очищаем input после добавления
          }}
          className={`w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center ${
            isInbox
              ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500"
              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500"
          }`}
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 py-8 text-sm">
            <div className="text-2xl mb-2">{isInbox ? "📝" : "📋"}</div>
            {isInbox ? "Нет черновиков" : "Нет задач"}
          </div>
        ) : (
          tasks.map((task) => <div key={task.id}>{<Task task={task} />}</div>)
        )}
      </div>
    </div>
  );
};
