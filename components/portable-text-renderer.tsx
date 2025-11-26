import { PortableText, PortableTextComponents } from '@portabletext/react'
import * as React from 'react'
import { cn } from '@/lib/utils'

const components: PortableTextComponents = {
  block: ({ children, value }) => {
    switch (value.style) {
      case 'h2':
        return <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
      case 'h3':
        return <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 italic my-4 text-muted-foreground">
            {children}
          </blockquote>
        )
      // 👇 LOGIKA BARU UNTUK JUSTIFY 👇
      case 'normal_justify':
        return (
          <p className="mb-4 leading-relaxed text-muted-foreground text-justify">
            {children}
          </p>
        )
      // 👆 SELESAI LOGIKA BARU 👆
      default:
        return <p className={cn("mb-4 leading-relaxed", value.style === 'normal' ? 'text-muted-foreground' : 'text-foreground')}>{children}</p>
    }
  },
  list: ({ children, value }) => {
    return value.list === 'bullet' ? <ul className="list-disc space-y-1 ml-6 mb-4 text-muted-foreground">{children}</ul> : <ol className="list-decimal space-y-1 ml-6 mb-4 text-muted-foreground">{children}</ol>
  },
  listItem: ({ children }) => <li className="text-muted-foreground">{children}</li>,
  marks: {
    link: ({ children, value }) => {
      const href = value.href || '#'
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
          {children}
        </a>
      )
    },
  },
}

export function PortableTextRenderer({ blocks }: { blocks: any }) {
  if (!blocks) return null
  return <PortableText value={blocks} components={components} />
}