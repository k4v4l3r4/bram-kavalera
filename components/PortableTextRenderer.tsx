"use client"

import * as React from "react"
import Image from "next/image"
import imageUrlBuilder from "@sanity/image-url"
import { PortableText, PortableTextComponents } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { cn } from "@/lib/utils"

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

// ================= PortableText Components =================
const components: PortableTextComponents = {
  /* ---------- BLOCK ---------- */
  block: ({ children, value }) => {
    switch (value.style) {
      case "h1":
        return <h1 className="text-4xl font-bold mt-10 mb-6">{children}</h1>
      case "h2":
        return <h2 className="text-2xl font-semibold mt-10 mb-6">{children}</h2>
      case "h3":
        return <h3 className="text-xl font-semibold mt-8 mb-4">{children}</h3>
      case "h4":
        return <h4 className="text-lg font-semibold mt-6 mb-3">{children}</h4>
      case "h5":
        return <h5 className="text-base font-semibold mt-5 mb-2">{children}</h5>
      case "h6":
        return (
          <h6 className="text-sm font-semibold mt-4 mb-2 uppercase text-muted-foreground">
            {children}
          </h6>
        )

      case "blockquote":
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground bg-muted/30 rounded-r-lg">
            {children}
          </blockquote>
        )

      case "normal_justify":
        return (
          <p className="my-5 leading-relaxed text-muted-foreground text-justify">
            {children}
          </p>
        )
      case "normal_center":
        return (
          <p className="my-5 leading-relaxed text-muted-foreground text-center">
            {children}
          </p>
        )
      case "normal_right":
        return (
          <p className="my-5 leading-relaxed text-muted-foreground text-right">
            {children}
          </p>
        )
      case "normal_left":
        return (
          <p className="my-5 leading-relaxed text-muted-foreground text-left">
            {children}
          </p>
        )

      default:
        return (
          <p
            className={cn(
              "my-5 leading-relaxed",
              value.style === "normal"
                ? "text-muted-foreground"
                : "text-foreground"
            )}
          >
            {children}
          </p>
        )
    }
  },

  /* ---------- LIST ---------- */
  list: ({ children, value }) =>
    value.list === "bullet" ? (
      <ul className="list-disc ml-6 my-5 space-y-2 text-muted-foreground marker:text-primary">
        {children}
      </ul>
    ) : (
      <ol className="list-decimal ml-6 my-5 space-y-2 text-muted-foreground marker:text-primary">
        {children}
      </ol>
    ),

  listItem: ({ children }) => <li className="pl-1">{children}</li>,

  /* ---------- MARKS ---------- */
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-4 decoration-primary/50">
        {children}
      </span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through decoration-destructive/50">
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#"
      const target = value?.blank ? "_blank" : undefined

      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
  },

  /* ---------- IMAGE (INI KUNCI MASALAH) ---------- */
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null

      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1400).quality(80).url()}
            alt={value.alt || "Gambar konten"}
            width={1400}
            height={800}
            className="rounded-xl shadow-sm mx-auto"
          />
          {value.alt && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// ================= Renderer =================
export function PortableTextRenderer({ blocks }: { blocks: any }) {
  if (!blocks) return null
  return <PortableText value={blocks} components={components} />
}
