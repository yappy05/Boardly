import type { TaskResponse } from "../../../entities/task/model/types.ts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TaskResponse;
}

export const Task = ({ task }: TaskProps) => {
  const { transform, transition, attributes, listeners, setNodeRef } =
    useSortable({
      id: task.id,
      data: {
        task,
        type: "task",
        columnStatus: task.status,
      },
      animateLayoutChanges: () => true,
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const isInbox = task.status === "INBOX";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group ${
        isInbox
          ? "bg-gray-50 border border-dashed border-gray-300 hover:border-gray-400"
          : "bg-white border border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex-1">
        <p
          className={`font-medium text-sm leading-relaxed transition-colors duration-200 ${
            isInbox
              ? "text-gray-600 group-hover:text-gray-700"
              : "text-gray-800 group-hover:text-gray-900"
          }`}
        >
          {task.title}
        </p>
      </div>
      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div
          className={`w-2 h-2 rounded-full ${
            isInbox ? "bg-gray-400" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
};
