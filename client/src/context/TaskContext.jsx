import { createContext , useContext, useState, useEffect } from 'react'
import { createTaskRequest, getTasksRequest, getTaskRequest, updateTasksRequest, deleteTaskRequest } from '../api/tasks'

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res)
    }

    const getTask = async (id) => {
      try {
        const res = await getTaskRequest(id)
        return res.data
      } catch (err) {
          console.log(err)
      }

  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task)
      return res.data
    } catch (err) {
        console.log(err)
    }

}

    const deleteTask = async (id) => {
        try {
          const res = await deleteTaskRequest(id);
          if (res.status === 204) {
            setTasks(tasks.filter((task) => task._id !== id));
            console.log(tasks)
          } 
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        console.log(tasks); // Ver el estado actualizado cuando tasks cambie
      }, [tasks]);

    return(<TaskContext.Provider value={{tasks, createTask, getTasks, getTask, updateTask, deleteTask}}>
        {children}
    </TaskContext.Provider>)
}