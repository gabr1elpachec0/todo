import * as Dialog from "@radix-ui/react-dialog";
import { Check, PlusCircle, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

interface CreateTaskProps {
  onTaskCreated: (title: string) => void
}

export function NewTask({ onTaskCreated }: CreateTaskProps) {
  const [title, setTitle] = useState('')

  const createTask = (event: FormEvent) => {
    event.preventDefault()

    if (title === '') {
      return
    }

    onTaskCreated(title)

    setTitle('')

    toast.success('Tarefa criada com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex items-center text-left border-zinc-800 border-2 px-5 py-3 gap-3 outline-none hover:border-zinc-700 rounded-xl duration-200'>
        <span className='text-sm font-medium text-zinc-200'>
          <PlusCircle className='size-4' />
        </span>
        <p className='text-sm text-zinc-400 hidden md:block'>
          Nova tarefa
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60' />
        <Dialog.Content className='overflow-hidden inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 fixed md:max-w-[520px] w-full md:h-[40vh] bg-zinc-800 md:rounded-xl flex flex-col outline-none'>
          <Dialog.Close className='absolute right-2 top-2 p-1.5 text-zinc-400 hover:text-zinc-100'>
            <X className='size-5'/>
          </Dialog.Close>
         <form className='flex-1 flex flex-col justify-center' onSubmit={createTask}>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <Dialog.Title className='text-2xl text-zinc-400 font-semibold'>
              Criar Tarefa
            </Dialog.Title>
            
            <label htmlFor="" className="mt-6">
              Tarefa
            </label>
            <input 
              type="text" 
              name="title" 
              className='bg-transparent border-2 border-zinc-700 rounded-xl px-3 py-4 outline-none text-sm' 
              placeholder='digite o título da tarefa' 
              onChange={event => setTitle(event.target.value)}
              value={title}
            />  

            <button
              type='submit'
              className='w-full flex items-center justify-center gap-2 bg-zinc-900 py-4 text-center text-sm text-zinc-300 outline-none font-medium hover:text-zinc-100 rounded-xl'
            >
              <span>
                <Check className='size-4' />
              </span>
              Confirmar
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}