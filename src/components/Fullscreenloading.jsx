import { LoaderIcon } from 'lucide-react'
import React from 'react'

const Fullscreenloading = ({label}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-2'>
        <LoaderIcon className='size-16 text-muted-foreground animate-spin '/>
        {label && <p className='text-sm text-center'>{label}</p>}
    </div>
  )
}

export default Fullscreenloading