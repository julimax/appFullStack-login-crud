import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
// fecha
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TasksFormPage () {

    const { register, handleSubmit, setValue } = useForm()
    const {createTask, getTask, updateTask} = useTasks()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() =>  {
        async function loadTask(){
            const task = await getTask(id)
            setValue('title', task.title)
            setValue('description', task.description)
        }
        loadTask()
    },[])

    const onSubmit = handleSubmit((data) =>{
        if (id) {
            updateTask(id, {
                ...data,
                date: dayjs.utc(data.date).format(),
              });
        } else {
            createTask({
                ...data,
                date: dayjs.utc(data.date).format()
            })
        }
        navigate('/tasks')
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 roun'>
                <form onSubmit={onSubmit}>
                    <label htmlFor='title'></label>
                    <input type="text" placeholder="Text"
                    {... register('title')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoFocus
                    />

                    <label htmlFor='description'></label>
                    <textarea rows="3" placeholder="Description"
                    {... register('description')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>

                    <label htmlFor='date'></label>
                    <input type="date" 
                    {... register('date')} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'required/>
                    
                    <button className='bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
                </form>
            </div>
        </div>
        
    )
}

export default TasksFormPage
