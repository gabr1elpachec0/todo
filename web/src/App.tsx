import { Task } from "./components/task"
import { NewTask } from "./components/new-task"
import { ChangeEvent, useEffect, useState } from "react"
import { api } from "./lib/axios"
import { toast } from "sonner"

interface Task {
  id: string
  title: string
  created_at: Date
  completed: boolean
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])  
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    try {
      const response = await api.get<Task[]>('/tasks')
      // console.log(response.data)
      
      setTasks(response.data.reverse())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createTask = async (title: string) => {
    try {
      await api.post<Task>('/task', {
        title
      })

      await fetchData()
    } catch (error) { 
      console.error(error)
      toast.error('Erro ao criar tarefa!')
    }
  }

  const toggleTask = async (id: string) => {
    try {
      await api.patch(`/task/${id}/toggle`)

      await fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value

    setSearch(query)
  }

  const filteredTasks = search !== '' ? tasks.filter(task => task.title.toLocaleLowerCase().includes(search)) : tasks

  const inProgressTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);


  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/task/${id}`)

      toast.success('Tarefa excluída com sucesso!')

      await fetchData()
    } catch(error) {
      console.error(error)
    }
  }

  // const updateTask = async (id: string, title: string) => {
  //   try {
  //     await api.patch(`/task/${id}/update`, {
  //       title
  //     })

  //     toast.success('Tarefa atualizada com sucesso!')

  //     await fetchData()
  //   } catch(error) {
  //     console.error(error)
  //   }
  // }



  return (
    <div className='max-w-6xl mx-auto my-12 space-y-6 px-5'>
      <div className='flex items-center w-full gap-10'>
        <NewTask onTaskCreated={createTask}/>

        <form action="" className=''>
          <input 
            type="text" 
            className='bg-transparent outline-none w-full text-lg' 
            placeholder='Busque uma tarefa...'
            onChange={handleSearch}
          />
        </form>
      </div>

      <div className='h-px bg-zinc-800' /> 

      <div className='w-full flex flex-col space-y-4'>
        {inProgressTasks.map(task => (
          <Task 
            id={task.id} 
            key={task.id} 
            title={task.title} 
            created_at={task.created_at} 
            completed={task.completed} 
            toggleTask={() => {toggleTask(task.id)}} 
            deleteTask={() => {deleteTask(task.id)}}
            // updateTask={() => {updateTask(task.id)}}
          />
        ))}
        {completedTasks.map(task => (
          <Task 
            id={task.id} 
            key={task.id} 
            title={task.title} 
            created_at={task.created_at} 
            completed={task.completed} 
            toggleTask={() => {toggleTask(task.id)}} 
            deleteTask={() => {deleteTask(task.id)}}
            // updateTask={() => {updateTask(task.id)}}
          />
        ))}
      </div>      
    </div>
  )
}
