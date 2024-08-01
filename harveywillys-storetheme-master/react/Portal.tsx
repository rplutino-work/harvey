import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export type CucardaType = 'PDP' | 'CATALOGO'

export default function ProductImage({
  children,
  parents = 1,
  querySelector,
}: {
  children: any
  parents: number
  querySelector: string
}) {
  const [count, setCount] = useState<number>(0)
  const [dom, setDom] = useState<Element | null>()
  const [refDom, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!refDom) return
    let parent: (Node & ParentNode) | null = refDom

    for (let index = 0; index < parents; index++) {
      if (!parent?.parentNode) return
      parent = parent.parentNode
    }

    if (!parent) return

    const _dom = parent.querySelector(querySelector)

    if (_dom) setDom(_dom)
    else setTimeout(() => setCount(count + 1), 250)
  })
  if (!dom) return <div ref={(e) => setRef(e)} style={{ display: 'none' }} />

  return createPortal(children, dom)
}
