
import {useColumnStore} from "./column-store.tsx";



export const useColumn = () => {
    const {addTask, getColumn} = useColumnStore()


    return {getColumn, addTask}

}