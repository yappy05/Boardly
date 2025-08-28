import { ColumnUi } from "../../../entities/Column/ui/Column.tsx";
import type {
  Column,
  ColumnStatus,
} from "../../../entities/Column/model/types.ts";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useColumnStore } from "../model/column-store.tsx";
import { TaskApi } from "../../../entities/task/api/task-api.ts";

interface ColumnProps {
  columnStatus: ColumnStatus;
}

export const ColumnContainer = ({ columnStatus }: ColumnProps) => {
  const { id: kanbanId } = useParams();

  const [currentColumn, setCurrentColumn] = useState<Column>();

  const { getColumn, addTask } = useColumnStore();
  const columns = useColumnStore((state) => state.columns);

  useEffect(() => {
    const column = getColumn(columnStatus);
    if (!column) return;
    setCurrentColumn(column);
  }, [getColumn, columns, columnStatus]);

  const handleAddTask = async (input: string) => {
    if (!kanbanId) return;
    const task = await TaskApi.createTask(kanbanId, {
      status: columnStatus,
      title: input,
      kanbanId,
    });
    addTask(columnStatus, task);
  };

  const { setNodeRef } = useDroppable({
    id: columnStatus,
    data: {
      type: "column",
      columnStatus,
    },
  });

  if (!currentColumn) return;

  return (
    <div
      ref={setNodeRef}
      className={
        "flex flex-1 flex-col bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-72 max-w-80 w-full h-full"
      }
    >
      <SortableContext
        items={currentColumn.tasks}
        strategy={verticalListSortingStrategy}
      >
        <ColumnUi
          tasks={currentColumn.tasks}
          columnStatus={columnStatus}
          handleAddTask={handleAddTask}
        />
      </SortableContext>
    </div>
  );
};
