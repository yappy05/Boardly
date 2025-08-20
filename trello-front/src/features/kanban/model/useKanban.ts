
import {createApi} from "../api/create.api.ts";
import {useEffect, useState} from "react";
import type {KanbanResponseType} from "../api/types/kanban-response.type.ts";
import {useAuth} from "../../auth/model/useAuth.ts";
import {findAllApi} from "../api/findAll.api.ts";
import {useNavigate} from "react-router-dom";

export const useKanban = () => {

    const navigate = useNavigate()
    const {user} = useAuth()

    useEffect(() => {
        const fetch = async () => {
            if (!user) return
            await findAll(user.id)
            console.log(user.id)
        }
        fetch()
    }, [user]);

    const [kanbans, setKanbans] = useState<KanbanResponseType[]>([])

    const findAll = async (userId: string) => {
        const response = await findAllApi(userId)
        setKanbans(response.map(kanban => ({
            ...kanban,
            createdAt: new Date(kanban.createdAt),
            updatedAt: new Date(kanban.updatedAt)
        })))
        return kanbans
    }

    const create = async (title: string) => {
        if (!user) throw new Error('проблема с сессией')
        const response = await createApi({title, userId: user.id})
        navigate(`/kanban/${response.id}`)
        return response
    }

    return {findAll, create, kanbans}
}