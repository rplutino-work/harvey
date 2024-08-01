import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'

import { useCucarda } from './context'

const useEditor = () => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    if (location.search.includes('__siteEditor')) setValue(true)
  }, [])

  return value
}

export enum ModeType {
  INSERT = 'INSERT',
  DIRECT = 'DIRECT',
  CSS = 'CSS',
}

export type _cucardasProps = {
  mode?: ModeType
  useRender: boolean
  id?: string
  styles?: any
  cucardasStyles?: any
}

export function Cucardas({ id, styles, cucardasStyles }: _cucardasProps) {
  const { cucardas = [] } = useCucarda(id) || {}
  const { product } = useProduct() as { product: ProductTypes.Product }
  const { clusterHighlights = [] } = product || {}
  const isEditorPage = useEditor()

  const findCucardas = (cruster: { id: string; name: string }) => {
    const c = cucardas.filter(
      (e) => e.clusterHighlights === cruster.id || (isEditorPage && e.demo)
    )

    c.map((c) => {
      if (c?.demo) c.active = true
    })

    return (
      c || {
        active: true,
        title: cruster.name,
        clusterHighlights: cruster.id,
        image: undefined,
        demo: false,
      }
    )
  }
  const finalList = clusterHighlights.sort(
    (a: { id: string }, b: { id: string }) => {
      const index1 = cucardas.findIndex((e) => e.clusterHighlights === a.id)
      const index2 = cucardas.findIndex((e) => e.clusterHighlights === b.id)
      return index1 > index2 ? 1 : -1
    }
  )

  const _cucardas = finalList
    .filter((c: { id: string; name: string }) =>
      findCucardas(c).find((c) => c.active)
    )
    .filter((e: { id: string; name: string }) => {
      const cucarda = findCucardas(e)
      return clusterHighlights.find(
        (c: { id: string; name: string }) =>
          cucarda.find((cs) => cs.clusterHighlights === c.id) ||
          cucarda.find((cs) => cs.clusterHighlights === c.name)
      )
    })
    .map((cruster: { id: string; name: string }, index: any) => {
      const cucardas = findCucardas(cruster)

      return cucardas
        .filter((c) => c.active)
        .map((cucarda, index2) => {
          let styles = {}

          try {
            styles = JSON.parse(
              cucarda.customStyles?.replace(/^(.*)?(\{[^]*\})(.*)?$/, '$2') ||
                '{}'
            )
          } catch (error) {
            console.log('🔹Cuardas: Error => ', error)
          }

          if (!cucarda.image) {
            return (
              <div
                key={`${index}-${index2}`}
                className="vtex-cucardas-item"
                // @ts-ignore
                clusterhighlights={cucarda.clusterHighlights}
                style={{
                  color: 'black',
                  font: 'normal normal 500 15px/18px TwCenMT',
                  ...cucardasStyles,
                  ...styles,
                }}
              >
                {cucarda.title || `Coleccion ${cucarda.clusterHighlights}`}
              </div>
            )
          }

          return (
            <img
              key={`${index}-${index2}`}
              title={cucarda.title}
              // @ts-ignore
              clusterhighlights={cucarda.clusterHighlights}
              src={cucarda.image}
              className="flex items-center justify-center vtex-cucardas-item"
              style={{
                ...cucardasStyles,
                ...styles,
              }}
            />
          )
        })
    })

  return (
    <div
      className={`flex vtex-cucardas${id ? `-${id}` : ``}`}
      style={styles || {}}
    >
      {_cucardas}
    </div>
  )
}
