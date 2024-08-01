/* eslint-disable prettier/prettier */
/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import React from 'react'

import { Context, _contextProps } from './context'
import { Cucardas, _cucardasProps } from './cucarda'

type _props = {
  context: boolean
} & _contextProps &
  _cucardasProps

function cucardas(props: _props) {
  const { context = false } = props
  if (context) return <Context {...props} />
  return <Cucardas {...props} />
}

cucardas.getSchema = (props: _props) => {
  if (!props.context) {
    return {
      title: `Cucarda${props.id ? `(${props.id})` : ''}`,
      description: 'cucarda',
    }
  }
  return {
    title: `Cucardas ${props.id ? `(${props.id})` : ''}`,
    description: 'cucarda',
    type: 'object',
    properties: {
      cucardas: {
        title: `Cucardas`,
        type: 'array',
        items: {
          type: 'object',
          properties: {
            active: {
              title: 'Activo',
              type: 'boolean',
              default: true,
            },
            image: {
              type: 'string',
              title: 'Imagen',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            clusterHighlights: {
              title: 'ClusterHighlights',
              type: 'string',
              description: 'ID de la colección',
            },
            title: {
              title: 'Titulo',
              type: 'string',
              description:
                'Se mostrara cuando el cursor este encima de la cucarda',
            },
            customStyles: {
              "title":"Personalizar Estilos",
              "default":"",
              "format":"RichText",
              "type":"string",
              "examples":[
                "vtex.native-types@0.x::store/native-types.richText"
              ],
              description:
                'Ej: {"backgroundColor": "#14d"}\n\rDocs: https://bit.ly/2ZROcZx',
            },
          },
        },
      },
    },
  }
}

export default cucardas
