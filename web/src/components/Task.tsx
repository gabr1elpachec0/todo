/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, Trash } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TaskProps {
  id: string
  title: string
  created_at: Date
  completed: boolean
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  // updateTask: (id: string, title: string) => void
}

export function Task({ id, title, created_at, completed, toggleTask, deleteTask }: TaskProps) {

  return (
    <div className='w-full flex items-center justify-between p-5 border-2 border-zinc-800 rounded-lg'>
      <Checkbox.Root
        className='flex items-center gap-3 focus:outline-none group'  
        onCheckedChange={() => toggleTask(id)} 
        checked={completed}           
      >
        <div className='h-5 w-5 rounded flex items-center justify-center border-2 border-zinc-200 group-data-[state=checked]:bg-zinc-400 group-data-[state=checked]:border-zinc-400 transition-colors duration-200'>
          <Checkbox.Indicator>
            <Check size={10} className='text-zinc-800'/>
          </Checkbox.Indicator>
        </div>
        <div className='flex flex-col items-start'>
          <span className='font-inter font-semibold group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 leading-tight'>
            {title}
          </span>
          <p 
            className='text-sm text-zinc-500 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'
          >
            {formatDistanceToNow(created_at, { locale: ptBR, addSuffix: true })}
          </p>
        </div>          
      </Checkbox.Root>

      <div className='flex gap-5'>
        {completed ? '' : <div className='animate-pulse size-4 rounded-full bg-zinc-400'/>}
        {/* <UpdateTask /> */}
        <button
         onClick={() => deleteTask(id)} 
        >
          <Trash className='size-4 hover:text-zinc-200 duration-200'/>
        </button>
      </div>
      
    </div>
  )
}
