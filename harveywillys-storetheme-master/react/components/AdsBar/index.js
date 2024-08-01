import React, { useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'

import s from './index.css'

const AdsBar = ({
  desktopImage,
  mobileImage,
  link,
  bannerHeight,
  collapseHeight,
  textLabel,
  colorBloquePrincipal,
  fontSize,
  show,
  fontColor,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { navigate } = useRuntime()

  const handleNavigation = () => {
    navigate({ to: link })
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const textStyle = {
    fontSize,
    color: fontColor,
  }

  const arrowImageSrc = '/arquivos/icon_arrow_down_black.svg?v=0.1'

  return (
    <>
      {show ? (
        <div
          className={`vtex--top-banner ${s.top_banner}`}
          style={{ backgroundColor: `${colorBloquePrincipal}` }}
        >
          <div
            className={s.top_banner_content}
            onClick={toggleExpand}
            style={{ height: `${bannerHeight}px`, fontSize }}
          >
            <p
              dangerouslySetInnerHTML={{ __html: textLabel }}
              style={textStyle}
            />
            <button className={`vtex--top-banner-button`}>
              <img
                src={arrowImageSrc}
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'all ease 0.4s',
                }}
                alt="Toggle Banner"
              />
            </button>
          </div>

          {isExpanded && (
            <div
              className={s.top_banner_image}
              onClick={handleNavigation}
              style={{ height: `${collapseHeight}px` }}
            >
              <a href={link}>
                <img
                  className={s.is_hidden_tablet}
                  src={mobileImage}
                  alt="Mobile Banner"
                  style={{
                    height: `${collapseHeight}px`,
                    objectFit: 'contain',
                  }}
                />
                <img
                  className={s.is_hidden_mobile}
                  src={desktopImage}
                  alt="Desktop Banner"
                  style={{
                    height: `${collapseHeight}px`,
                    objectFit: 'contain',
                  }}
                />
              </a>
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

AdsBar.getSchema = (props) => {
  return {
    title: `Barra De Anuncios ${props.id ? `${props.id}` : ''}`,
    description: 'Una barra de anuncios desplegable personalizable.',
    type: 'object',
    properties: {
      show: {
        title: 'Mostrar componente?',
        type: 'boolean',
        default: false,
      },
      textLabel: {
        title: 'Titulo Del Anuncio',
        description:
          'Introduce el texto. Usa <strong> para negrita y <em> para cursiva.',
        type: 'string',
        widget: {
          'ui:widget': 'textarea',
        },
      },
      fontSize: {
        title: 'Tamaño de la Fuente del Titulo',
        type: 'string',
        default: '2.5rem',
      },
      fontColor: {
        title: 'Color de la Fuente del Titulo',
        type: 'string',
        default: '#000',
        widget: {
          'ui:widget': 'color',
        },
      },
      colorBloquePrincipal: {
        title: 'Color Del Bloque Principal',
        description: 'Selecciona un color para el bloque principal.',
        type: 'string',
        widget: {
          'ui:widget': 'color',
        },
        default: '#ffffff',
      },
      desktopImage: {
        title: 'Imagen Desktop',
        type: 'string',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      mobileImage: {
        title: 'Imagen Mobile',
        type: 'string',
        widget: {
          'ui:widget': 'image-uploader',
        },
      },
      link: {
        title: 'Link',
        type: 'string',
      },
      bannerHeight: {
        title: 'Altura Cabecera De La Barra',
        type: 'number',
        default: 50,
      },
      collapseHeight: {
        title: 'Altura Cuerpo De La Barra',
        type: 'number',
        default: 500,
      },
    },
  }
}

export default AdsBar
