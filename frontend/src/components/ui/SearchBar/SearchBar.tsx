import React, { useRef } from 'react'
import { SimpleButton } from '../../buttons'
import { GenericInput } from '../../inputs'

type Props = {
  search: (searchTerm: string) => void
}

const SearchBar = ({ search }: Props) => {

  const ref = useRef<HTMLInputElement>(null)

  return (
    <div className='flex space-x-3'>
      <GenericInput
        type='text'
        className='w-full'
        ref={ref}
      />

      <SimpleButton
        label='Search'
        className='px-2 py-1.5  bg-black mx-auto text-white'
        onClick={() => ref.current?.value !== undefined && search(ref.current?.value.trim())}
      />
    </div>
  )
}

export default SearchBar