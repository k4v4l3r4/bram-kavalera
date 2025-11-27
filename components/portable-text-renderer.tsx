import { PortableText, PortableTextComponents } from '@portabletext/react'
import * as React from 'react'
import { cn } from '@/lib/utils'

const components: PortableTextComponents = {
  block: ({ children, value }) => {
    switch (value.style) {
      case 'h1':
        return <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
      case 'h2':
        return <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
      case 'h3':
        return <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
      case 'h4':
        return <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
      case 'h5':
        return <h5 className="text-base font-bold mt-3 mb-2">{children}</h5>
      case 'h6':
        return <h6 className="text-sm font-bold mt-2 mb-1 uppercase text-muted-foreground">{children}</h6>
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 italic my-4 text-muted-foreground bg-muted/30 rounded-r-lg">
            {children}
          </blockquote>
        )
      
      // 👇 LOGIKA ALIGNMENT LENGKAP 👇
      case 'normal_justify':
        return <p className="mb-4 leading-relaxed text-muted-foreground text-justify">{children}</p>
      case 'normal_center':
        return <p className="mb-4 leading-relaxed text-muted-foreground text-center">{children}</p>
      case 'normal_right':
        return <p className="mb-4 leading-relaxed text-muted-foreground text-right">{children}</p>
      case 'normal_left':
        return <p className="mb-4 leading-relaxed text-muted-foreground text-left">{children}</p>
      // 👆 ------------------------- 👆

      default:
        // Default (Normal)
        return <p className={cn("mb-4 leading-relaxed", value.style === 'normal' ? 'text-muted-foreground' : 'text-foreground')}>{children}</p>
    }
  },
  list: ({ children, value }) => {
    return value.list === 'bullet' 
      ? <ul className="list-disc space-y-1 ml-6 mb-4 text-muted-foreground marker:text-primary">{children}</ul> 
      : <ol className="list-decimal space-y-1 ml-6 mb-4 text-muted-foreground marker:text-primary">{children}</ol>
  },
  listItem: ({ children }) => <li className="pl-1">{children}</li>,
  
  // 👇 LOGIKA DEKORASI (MARKS) 👇
  marks: {
    strong: ({children}) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({children}) => <em className="italic text-foreground">{children}</em>,
    underline: ({children}) => <span className="underline underline-offset-4 decoration-primary/50">{children}</span>,
    'strike-through': ({children}) => <span className="line-through decoration-destructive/50">{children}</span>,
    code: ({children}) => <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">{children}</code>,
    
    link: ({ children, value }) => {
      const href = value.href || '#'
      const target = value.blank ? '_blank' : undefined
      return (
        <a 
          href={href} 
          target={target} 
          rel={target === '_blank' ? "noopener noreferrer" : undefined} 
          className="text-primary hover:underline font-medium transition-colors"
        >
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