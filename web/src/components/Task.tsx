import * as Checkbox from "@radix-ui/react-checkbox"
import * as Dialog from "@radix-ui/react-dialog"
import { Check, Pencil, Trash, X} from 'phosphor-react'
import { UpdateTaskForm } from "./UpdateTaskForm"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import dayjs from "dayjs"

interface Task {
  id: string,
  title: string,
  created_at: Date,
  completed: boolean
}

export function Task() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchData = async () => {
    try {
      const response = await api.get<Task[]>('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/task/${id}`)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
      alert('Tarefa excluída!')
    } catch (error) {
      console.error('Error deleting task: ', error)
    }    
  }

  const toggleTask = async (id: string) => {
    try {
      await api.patch(`/task/${id}/toggle`)
  
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => 
          task.id === id ? { ...task, completed: !task.completed } : task
      )
        console.log(updatedTasks)
        return updatedTasks
      })
      
      // alert('Tarefa alterada!')
    } catch (error) {
      console.error('Error toggling task: ', error)
    }
  }

  return (
    <>
      {tasks.map(task => (
        <div className='flex flex-col w-full border-2 border-zinc-200 rounded-lg px-5 py-3 mb-3' key={task.id}>
          <div className='flex items-center justify-between'>
            <Checkbox.Root
              className='flex items-center gap-3 focus:outline-none group'              
              onCheckedChange={() => toggleTask(task.id)}
              checked={task.completed}
            >
              <div className='h-6 w-6 rounded flex items-center justify-center border-2 border-zinc-200 group-data-[state=checked]:bg-purpleButton group-data-[state=checked]:border-purpleButton transition-colors duration-200'>
                <Checkbox.Indicator
                >
                  <Check size={15} className='text-white'/>
                </Checkbox.Indicator>
              </div>
              <div className='flex flex-col items-start'>
                <span className='font-inter font-semibold group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 leading-tight'>
                  {task.title}
                </span>
                <p 
                  className='text-sm text-yellow-500 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
                >
                  {dayjs(task.created_at).locale('pt-br').format('DD/MM/YYYY')}
                </p>
              </div>          
            </Checkbox.Root>
            <div className='justify-items-end flex items-center justify-between gap-x-2'>
              {task.completed ? <p className='text-sm text-green-500'>completed</p> : <p className='text-sm text-blue-500'>in progress</p> }
              <Dialog.Root>
                <Dialog.Trigger>
                  <Pencil size={20} className='cursor-pointer hover:opacity-80 text-black duration-100'/>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
                  <Dialog.Content className='absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <Dialog.Close className='absolute right-6 top-6 text-purpleButton rounded-lg'>
                      <X size={24} aria-label="fechar"/>
                    </Dialog.Close>

                    <Dialog.Title className='text-3xl text-purpleButton font-inter leading-tight'>
                      Editar tarefa
                    </Dialog.Title>
                    <UpdateTaskForm taskId={task.id} taskTitle={task.title} />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <Trash size={20} className='cursor-pointer hover:opacity-80 text-black duration-100' onClick={() => deleteTask(task.id)}/>
            </div>
          </div>     
        </div>
      ))}
    </>
  )
}
