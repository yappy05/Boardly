import { KanbanBoard } from "../../../widgets/kanban/ui/kanban-board.tsx";
import { KanbanApi } from "../../../entities/kanban/api/kanban-api.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useColumnStore } from "../../../features/column/model/column-store.tsx";

export const KanbanPage = () => {
  const { id } = useParams();
  const { initializeKanban } = useColumnStore();
  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const kanban = await KanbanApi.getKanban(id);
      initializeKanban(kanban);
    };
    fetch();
  }, [id, initializeKanban]);

  return (
    <div className={"flex flex-1 flex-col h-full"}>
      <KanbanBoard />
    </div>
  );
};
