/* eslint-disable prettier/prettier */
/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import { useEffect, useRef, useState } from 'react'

const nameEvent = `cucardachange`
export const FakeContextCucarda: { [key: string]: _contextProps } = {
  default: { cucardas: [] },
}

export type _cucarda = {
  active: boolean
  title: string
  clusterHighlights: string
  image: string,
  demo: boolean,
  customStyles:string
}
export type _contextProps = {
  cucardas: _cucarda[]
  id?: string
}

export function Context(props: _contextProps) {
  FakeContextCucarda[props.id || 'default'] = props
  useEffect(() => {
    if (!(window as any).cucardachange)
      (window as any).cucardachange = new Event(nameEvent)
    else document.dispatchEvent((window as any).cucardachange)
  })
  return null
}

export function useCucarda(id = 'default') {
  const [count, setCount] = useState(0)

  const _ref = useRef<any>()
  _ref.current = { setCount, count }

  useEffect(() => {
    const update = () => _ref.current.setCount(_ref.current.count + 1)
    document.addEventListener(nameEvent, update)
    return () => document.removeEventListener(nameEvent, update)
  }, [])

  return FakeContextCucarda[id]
}