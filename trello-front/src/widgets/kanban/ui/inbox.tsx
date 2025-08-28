import { ColumnContainer } from "../../../features/column/ui/ColumnContainer.tsx";

export const Inbox = () => {
  return (
    <div className={"flex flex-row xl:flex-row h-full flex-1"}>
      <ColumnContainer columnStatus={"INBOX"} />
    </div>
  );
};
