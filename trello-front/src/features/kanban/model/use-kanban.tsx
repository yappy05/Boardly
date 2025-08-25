import {useKanbanStore} from "./kanban-store.tsx";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const useKanban = () => {
    const store = useKanbanStore()
    const {id} = useParams()

    useEffect(() => {
        const fetch = async () => {
            await store.fetchKanbans()
        }
        fetch()
    }, [store.kanbans.length]);
    useEffect(() => {
        const fetch = async () => {
            if (!id) return
            await store.fetchCurrentKanban(id)
        }
        fetch()
    }, [store.kanbans]);

    return {...store}
}