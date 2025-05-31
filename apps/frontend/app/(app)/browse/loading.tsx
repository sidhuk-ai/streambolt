import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex min-h-screen flex-col'>
        <div className='flex-1'>
            <div className='container py-6 md:px-6'>
                <div className="flex flex-nowrap gap-2.5 mb-6 overflow-x-hidden justify-center items-center py-2">
                    {Array.from({ length: 12 }).map((_, i) =>{
                        return (
                            <Skeleton key={i} className='bg-muted-foreground h-7 w-20 rounded-full'/>
                        )})
                    }
                </div>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full place-content-center">
                    {Array.from({length: 12}).map((_,i) => {
                        return (
                            <aside key={i}>
                                <Skeleton className='bg-muted-foreground rounded-md h-40 w-full'/>
                                <div className='flex gap-2 p-2 m-2 flex-row'>
                                    <Skeleton className='bg-muted-foreground rounded-full h-10 w-10' />
                                    <div className="flex gap-2 flex-col">
                                        <Skeleton className='h-6 w-full bg-muted-foreground'/>
                                        <Skeleton className='h-6 w-full bg-muted-foreground'/>
                                        <div className='flex gap-1'>
                                            <Skeleton className='bg-muted-foreground h-4 w-10 rounded-full'/>
                                            <Skeleton className='bg-muted-foreground h-4 w-10 rounded-full'/>
                                            <Skeleton className='bg-muted-foreground h-4 w-10 rounded-full'/>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        )})
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading