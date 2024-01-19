import * as Checkbox from "@radix-ui/react-checkbox"
import { Check, Pencil, Trash} from 'phosphor-react'

export function Task() {
  return (
    <div className='flex flex-col w-full border-2 border-zinc-200 rounded-lg px-5 py-3'>
      <div className='flex items-center justify-between'>
        <Checkbox.Root
          className='flex items-center gap-3 focus:outline-none group'
        >
          <div className='h-6 w-6 rounded flex items-center justify-center border-2 border-zinc-200 group-data-[state=checked]:bg-purpleButton group-data-[state=checked]:border-purpleButton transition-colors duration-200'>
            <Checkbox.Indicator>
              <Check size={15} className='text-white'/>
            </Checkbox.Indicator>
          </div>
          <div className='flex flex-col items-start'>
            <span className='font-inter font-semibold group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 leading-tight'>
              Leitura
            </span>
            <p className='text-sm text-yellow-500 group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>18/01/2024</p>
          </div>          
        </Checkbox.Root>
        <div className='justify-items-end flex items-center justify-between gap-x-2'>
          {/* <p className='text-sm text-green-500'>completed</p> */}
          <Pencil size={20} className='text-purpleButton cursor-pointer'/>
          <Trash size={20} className='text-purpleButton cursor-pointer'/>
        </div>
      </div>     
    </div>
  )
}