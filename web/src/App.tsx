import * as Dialog from "@radix-ui/react-dialog"
import { Task } from "./components/Task"
import { X } from 'phosphor-react'
import { NewTaskForm } from "./components/NewTaskForm"
import { useState } from "react"

function App() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleItemClick = (item: string) => {
    console.log(`Selected item: ${item}`)

    setDropdownOpen(false)
  }

  return (
    <div className='flex w-screen h-screen items-center text-center justify-center'>
      <div className='flex flex-col items-start w-1/2 h-1/2 font-inter'>
        <div className='flex gap-x-3 items-center justify-center mb-5'>
          <h1 className='font-bold text-2xl'>ToDo List</h1>
        </div>
        <hr className='border-zinc-200 w-full rounded mb-10' />
        
        <div className='flex gap-x-5 mb-10 w-full'>
          <Dialog.Root>
            <Dialog.Trigger>
            <button className='bg-purpleButton px-5 py-2 rounded-xl text-white flex gap-x-3 font-semibold items-center hover:opacity-80 duration-700'>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </span>
              New Task
            </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
              <Dialog.Content className='absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Dialog.Close className='absolute right-6 top-6 text-purpleButton rounded-lg'>
                  <X size={24} aria-label="fechar"/>
                </Dialog.Close>
                
                <Dialog.Title className='text-3xl text-purpleButton font-inter leading-tight'>
                  Criar tarefa
                </Dialog.Title>

                <NewTaskForm />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          

          <button
            className="border-2 border-zinc-200 px-5 py-2 rounded-xl text-black flex gap-x-3 font-semibold items-center"
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
          >
            Filters
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
            </span>
          </button>
          {isDropdownOpen && (
            <div className='flex rounded-xl border-2 border-zinc-200 items-center'>
              <a href='#' className='block px-4 py-2 text-sm hover:text-purpleButton duration-300 text-gray-700 cursor-pointer' onClick={() => handleItemClick('Item 1')}>All</a>
              <a href='#' className='block px-4 py-2 text-sm hover:text-purpleButton duration-300 text-gray-700 cursor-pointer' onClick={() => handleItemClick('Item 2')}>In progress</a>
              <a href='#' className='block px-4 py-2 text-sm hover:text-purpleButton duration-300 text-gray-700 cursor-pointer' onClick={() => handleItemClick('Item 3')}>Completed</a>
            </div>
          )}
        </div>

        <Task />
        
      </div>
    </div>
  )
}

export default App
