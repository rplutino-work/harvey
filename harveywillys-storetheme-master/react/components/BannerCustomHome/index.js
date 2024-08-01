import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useRuntime } from 'vtex.render-runtime'
import './index.global.css'

const BannerCustomHome = ({
  isEnabled,
  content,
  startDate,
  endDate,
  id,
  dotsColor,
}) => {
  const { deviceInfo: { isMobile } } = useRuntime()

  const now = new Date()

  if (
    !isEnabled ||
    now < new Date(startDate) ||
    now > new Date(endDate) ||
    !content
  ) {
    return null
  }

  const filteredContent = content.filter(
    ({ startDate: itemStart, endDate: itemEnd }) => {
      const start = itemStart
        ? new Date(itemStart)
        : new Date(-8640000000000000)
      const end = itemEnd ? new Date(itemEnd) : new Date(8640000000000000)
      return now >= start && now <= end
    }
  )

  return (
    <div className={`bannerContainer`}>
      <Splide
        hasTrack={false}
        aria-label="Slider"
        options={{
          heightRatio: 1,
          pagination: true,
          arrows: false,
          cover: true,
          autoplay: true,
          interval: 4000,
          rewind: true,
          speed: 1000,
          breakpoints: {
            1024: {
              heightRatio: null
            }
          }
        }}
        className="splideSlider__mainSlider"
      >
        <SplideTrack>
          {
            filteredContent.map((item, index) => (
              <SplideSlide ket={index}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={`slideLink`}>
                  {item.type === 'Video' ? (
                    // <ReactPlayer
                    //   url={isMobile ? item.srcVideoMobile : item.srcVideoDesktop}
                    //   playing
                    //   loop
                    //   muted
                    //   width="100%"
                    //   height="100%"
                    //   className={isMobile ? '' : 'imgItemVideo'}
                    // />
                    <ReactPlayer
                      url={isMobile ? item.srcVideoMobile : item.srcVideoDesktop}
                      playing={true}
                      loop={true}
                      muted={true}
                      controls={false}
                      width="100%"
                      height="100%"
                      config={{
                        youtube: {
                          playerVars: {
                            autoplay: 1,
                            loop: 1,
                            playlist: isMobile ? item.srcVideoMobile.split('v=')[1] : item.srcVideoDesktop.split('v=')[1], 
                            modestbranding: 1, 
                            fs: 0, 
                            iv_load_policy: 3, 
                            controls: 0, 
                            disablekb: 1,
                            showinfo: 0, 
                            rel: 0, 
                          }
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={isMobile ? item.srcMobile : item.srcDesktop}
                      className={`imgItem`}
                      alt="Slider item"
                    />
                  )}
                  {item.title && <h2 className={`${`bannerTitle`} ${item.titlePosition}`} style={{ color: item.titleColor }}>{item.title}</h2>}
                </a>
              </SplideSlide>
            ))
          }
        </SplideTrack>
      </Splide>
    </div>
  )
}

BannerCustomHome.getSchema = (props) => {
  return {
    title: `Banner Custom Home ${props.id ? `(${props.id})` : ''}`,
    description: 'Configuracion Home Banners',
    type: 'object',
    properties: {
      isEnabled: {
        title: 'Mostrar Todo El Componente ?',
        type: 'boolean',
        default: true,
      },
      content: {
        title: 'Slider',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              title: 'Tipo',
              type: 'string',
              enum: ['Imagen', 'Video'],
              default: 'text',
            },
            srcDesktop: {
              title: 'Imagen (Desktop)',
              description: 'Agregar imagen o video segun el tipo elegido',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            srcMobile: {
              title: 'Imagen (Mobile)',
              description: 'Agregar imagen o video segun el tipo elegido',
              type: 'string',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
            srcVideoDesktop: {
              title: 'URL Video (Desktop)',
              description: 'Agregar video segun el tipo elegido',
              type: 'string',
            },
            srcVideoMobile: {
              title: 'URL Video (Mobile)',
              description: 'Agregar video segun el tipo elegido',
              type: 'string',
            },
            href: {
              title: 'Link',
              type: 'string',
              description:
                'Agregar link para ser redirijido en caso de hacer click',
            },
            title: {
              title: 'Titulo',
              type: 'string',
              description:
                'Texto en formato de titulo',
            },
            titlePosition: {
              title: 'Posición del título',
              type: 'string',
              enum: ['topLeft', 'topCenter', 'topRight', 'centerLeft', 'center', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
              default: 'bottomLeft'
            },
            titleColor: {
              title: 'Color del título',
              type: 'string',
              widget: {
                'ui:widget': 'color',
              },
              default: '#000'
            },
            startDate: {
              title: 'Fecha De Inicio',
              description: 'Fecha de inicion en la que se mostrara el item',
              type: 'string',
              format: 'date-time',
              widget: {
                'ui:widget': 'datetime',
              },
            },
            endDate: {
              title: 'Fecha De Finalizacion',
              description: 'Fecha de fin en la que se ocultara el item',
              type: 'string',
              format: 'date-time',
              widget: {
                'ui:widget': 'datetime',
              },
            },
          },
          dependencies: {
            type: {
              oneOf: [
                {
                  properties: {
                    type: {
                      enum: ['Imagen', 'Video'],
                    },
                  },
                },
              ],
            },
          },
        },
      },
      dotsColor: {
        title: 'Color de los dots o bullets del slider',
        description: 'Configura el color de los dots del slider',
        type: 'string',
        default: '#ffff',
        widget: {
          'ui:widget': 'color',
        },
      },
      startDate: {
        title: 'Fecha De Inicio Del Bloque',
        description: 'Fecha de inicion en la que se mostrara el bloque',
        type: 'string',
        format: 'date-time',
        widget: {
          'ui:widget': 'datetime',
        },
      },
      endDate: {
        title: 'Fecha De Finalizacion Del Bloque',
        description: 'Fecha de fin en la que se ocultara el item el bloque',
        type: 'string',
        format: 'date-time',
        widget: {
          'ui:widget': 'datetime',
        },
      },
    },
  }
}

export default BannerCustomHome
