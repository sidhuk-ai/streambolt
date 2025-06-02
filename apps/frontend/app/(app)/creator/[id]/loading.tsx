"use client";
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner skeleton */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-muted animate-pulse" />

      {/* Profile section skeleton */}
      <div className="container px-4 md:px-6">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Avatar skeleton */}
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-muted animate-pulse border-4 border-background" />

            {/* Info skeleton */}
            <div className="flex-1 space-y-4 pb-4">
              <div className="space-y-2">
                <div className="h-8 w-64 bg-muted rounded animate-pulse" />
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-4 w-full max-w-md bg-muted rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Button skeleton */}
            <div className="h-10 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mt-8 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 w-48 bg-muted rounded animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-48 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading