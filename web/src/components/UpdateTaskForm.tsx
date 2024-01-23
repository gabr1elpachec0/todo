import { Check } from "phosphor-react"
import { FormEvent, useState } from "react"
import { api } from "../lib/axios"

interface UpdateTaskFormProps {
  taskId: string
}

export function UpdateTaskForm({taskId}: UpdateTaskFormProps) {
  const [title, setTitle] = useState('')

  async function updateTask(event: FormEvent) {
    event.preventDefault()

    if (title) {
      await api.patch(`/task/${taskId}/update`, {
        title
      })
    } else {
      console.log('Campo não informado')
    }

    setTitle('')

    alert('Tarefa atualizada com sucesso!')
  }

  return (
    <form className='w-full flex flex-col mt-6' onSubmit={updateTask}>
      <label htmlFor="title" className='font-inter leading-tight'>
        Tarefa
      </label>
      <input
        type="text"
        id="title"
        placeholder="digite o título da sua tarefa"
        className='p-4 rounded-xl mt-3 border-2 border-zinc-200 text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purpleButton'
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <button
        type='submit'
        className='w-full mt-6 rounded-xl gap-3 bg-purpleButton flex items-center justify-center font-inter text-white p-4 focus:outline-none focus:ring-2 focus:ring-zinc-400 hover:opacity-80 duration-300'
      >
        <Check size={20} weight='bold'/>
        Confirmar
      </button>
    </form>
  )
}