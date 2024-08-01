import React from 'react'
import { Link } from 'vtex.render-runtime'

import styles from './index.css'

const PreHeader = ({ isEnabled, content, backGroundColor, speed }) => {
  if (!isEnabled || !content) {
    return null
  }

  const background = {
    backgroundColor: backGroundColor,
  }

  const transition = {
    animationDuration: speed,
  }

  return (
    <div className={styles.containerPreHeader} style={background}>
      <div className={styles.flexContainerPreHeader} style={transition}>
        {[
          ...content,
          ...content,
          ...content,
          ...content,
          ...content,
          ...content,
          ...content,
        ].map((item, index) => (
          <div key={index} className={styles.flexContainerPreHeaderItems}>
            <div className={styles.preheaderItem}>
              <p
                className={styles.flexContainerPreHeaderItemp}
                style={{ color: item.fontColor, fontSize: item.fontSize }}
              >
                {item.type === 'Texto' && (
                  <span dangerouslySetInnerHTML={{ __html: item.value }} />
                )}
                {item.type === 'Emoji' && <span>{item.value}</span>}
                {item.type === 'Link' && (
                  <Link to={item.href} className={styles.link}>
                    {item.value}
                  </Link>
                )}
                {item.type === 'Imagen' && (
                  <img src={item.src} style={{ width: '18px' }} />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

PreHeader.schema = {
  title: 'Pre Header',
  description: 'Configuracion para el Pre Header',
  type: 'object',
  properties: {
    isEnabled: {
      title: 'Mostrar Componente ?',
      type: 'boolean',
      default: true,
    },
    content: {
      title: 'Contenido',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            title: 'Tipo',
            type: 'string',
            enum: ['Texto', 'Emoji', 'Link', 'Imagen'],
            default: 'text',
          },
          value: {
            title: 'Texto',
            type: 'string',
            description:
              'Texto en negrita Ej: <b>Envio Gratis</b>, Texto en cursiva Ej: <em>Envio Gratis</em>, Para que al hacer click redirija al link',
          },
          href: {
            title: 'Link URL',
            type: 'string',
          },
          src: {
            title: 'Imagen',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          fontColor: {
            title: 'Color de la letra',
            description: 'Por defecto negro',
            type: 'string',
            default: '#000',
            widget: {
              'ui:widget': 'color',
            },
          },
          fontSize: {
            title: 'Tamaño de la fuente',
            description: 'Por defecto 12px',
            type: 'string',
            default: '12px',
          },
        },
        dependencies: {
          type: {
            oneOf: [
              {
                properties: {
                  type: {
                    enum: ['text', 'emoji', 'image'],
                  },
                },
              },
              {
                properties: {
                  type: {
                    enum: ['link'],
                  },
                  href: {
                    type: 'string',
                  },
                },
              },
            ],
          },
        },
      },
    },
    backGroundColor: {
      title: 'Color De Fondo',
      type: 'string',
      default: '#ffff',
      widget: {
        'ui:widget': 'color',
      },
    },
    speed: {
      title: 'Velocidad de desplazamiento del Pre Header',
      description: 'Por defecto 50s',
      type: 'string',
      default: '50s',
    },
  },
}

export default PreHeader
