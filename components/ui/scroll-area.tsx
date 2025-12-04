'use client'

import * as React from "react"
import {
  Root as ScrollAreaRoot,
  Viewport as ScrollAreaViewport,
  Scrollbar as ScrollAreaScrollbar,
  Thumb as ScrollAreaThumb,
  Corner as ScrollAreaCorner,
} from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

export function ScrollArea({ className, children, ...props }) {
  return (
    <ScrollAreaRoot
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaViewport className="w-full h-full rounded-[inherit]">
        {children}
      </ScrollAreaViewport>

      <ScrollBar />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}

export function ScrollBar({ className, orientation = "vertical", ...props }) {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 select-none",
        orientation === "vertical" ? "w-2.5" : "h-2.5 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaThumb className="flex-1 bg-border rounded-full" />
    </ScrollAreaScrollbar>
  )
}
