import { ColumnContainer } from "../../../features/column/ui/ColumnContainer.tsx";

export const Board = () => {
  return (
    <div
      className={
        "flex flex-1 flex-col xl:flex-row gap-4 justify-center h-full"
      }
    >
      <ColumnContainer columnStatus={"TODO"} />
      <ColumnContainer columnStatus={"INPROGRESS"} />
      <ColumnContainer columnStatus={"DONE"} />
    </div>
  );
};
