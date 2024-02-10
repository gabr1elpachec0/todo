/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

// interface UpdateTaskProps {
//   id: string
//   onTaskUpdated: (title: string, taskId: string) => void
// }

export function UpdateTask() {
  const [title, setTitle] = useState('')

  return (
    <Dialog.Root>
    <Dialog.Trigger>
      <Pencil className='size-4 hover:text-zinc-200 duration-200'/>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className='inset-0 fixed bg-black/60' />
      <Dialog.Content className='overflow-hidden inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 md:left-1/2 md:top-1/2 fixed md:max-w-[520px] w-full md:h-[40vh] bg-zinc-800 md:rounded-xl flex flex-col outline-none'>
        <Dialog.Close className='absolute right-2 top-2 p-1.5 text-zinc-400 hover:text-zinc-100'>
          <X className='size-5'/>
        </Dialog.Close>
        <form className='flex-1 flex flex-col justify-center'>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <Dialog.Title className='text-2xl text-zinc-400 font-semibold'>
              Atualizar Tarefa
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