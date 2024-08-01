import React, { useEffect, useState } from 'react'

// import { useDevice } from 'vtex.device-detector';
import s from './Countdown.module.css'

const Countdown = ({
  activationDate,
  deactivationDate,
  hideDate,
  visibility,
  bgColorCountdownBlock,
  bgImageCountdownBlock,
  image,
  imageAlt,
  textTitle,
  colorCountdownTitle,
  hideTitle,
  bgColorCountdownTimer,
  colorCountdownTimer,
  colorCountdownDividerAndTimeUnit,
}) => {
  // const { isMobile } = useDevice();

  const styleCountdownBlock = {
    backgroundColor: bgColorCountdownBlock,
    backgroundImage: `url(${bgImageCountdownBlock})`,
  }

  const styleCountdownTitle = {
    color: colorCountdownTitle,
  }

  const styleCountdownTimer = {
    backgroundColor: bgColorCountdownTimer,
    color: colorCountdownTimer,
  }

  const styleCountdownDivider = {
    color: colorCountdownDividerAndTimeUnit,
  }

  const styleCountdownTimeUnit = {
    color: colorCountdownDividerAndTimeUnit,
  }

  const calculateTimeLeft = () => {
    const localDeactivationDate = new Date(deactivationDate)
    const difference = +new Date(`${localDeactivationDate}`) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const validateActivation = () => {
    if (activationDate) {
      const localActivationDate = new Date(activationDate)
      return new Date().getTime() > localActivationDate.getTime()
    }
  }

  const validateDeactivation = () => {
    if (deactivationDate) {
      const localDeactivationDate = new Date(deactivationDate)
      return new Date().getTime() < localDeactivationDate.getTime()
    }
  }

  const validateForceHide = () => {
    if (hideDate) {
      const localHideDate = new Date(hideDate)
      return new Date().getTime() < localHideDate.getTime()
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [isActive, setIsActive] = useState(false)
  const [deactivate, setDeactivate] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
      setIsActive(validateActivation())
      setDeactivate(validateDeactivation())
      setHide(validateForceHide())
    }, 1000)
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div className={s.timeWrapper}>
        <div className={s.timeBox}>
          <span className={s.time} style={styleCountdownTimer}>
            {timeLeft[interval] < 10
              ? '0' + timeLeft[interval]
              : timeLeft[interval]}
          </span>
          <span className={s.timeUnit} style={styleCountdownTimeUnit}>
            {interval}
          </span>
        </div>
        <div className={s.timeDivider} style={styleCountdownDivider}>
          :
        </div>
      </div>
    )
  })

  return (
    <>
      {visibility && isActive && deactivate && hide ? (
        <div className={s.countdownBlock} style={styleCountdownBlock}>
          <div className={s.innerCountdownBlock}>
            <div className={s.leftWrapper}>
              <img
                src={image}
                alt={imageAlt}
                title={imageAlt}
                className={s.image}
              />
              {!hideTitle && (
                <div className={s.title} style={styleCountdownTitle}>
                  {textTitle}
                </div>
              )}
            </div>
            <div className={s.rightWrapper}>
              {timerComponents.length ? timerComponents : null}
              {/* <div className={s.titleSecondary} style={ styleCountdownTitle }><p>{textTitleSecondary}</p></div> */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

const defaultProps = {
  activationDate: '',
  deactivationDate: '',
  hideDate: '',
  visibility: false,
  bgColorCountdownBlock: '',
  bgImageCountdownBlock: '',
  image: '',
  imageAlt: '',
  textTitle: 'Últimos',
  textTitleSecondary: ' DE HOTSALE',
  colorCountdownTitle: '#903477',
  hideTitle: false,
  bgColorCountdownTimer: '#903477',
  colorCountdownTimer: '#ffffff',
  colorCountdownDividerAndTimeUnit: '#ffffff',
}

Countdown.defaultProps = defaultProps

Countdown.schema = {
  type: 'object',
  title: 'Countdown',
  properties: {
    activationDate: {
      title: 'Countdown: Fecha y hora de activación del temporizador',
      type: 'string',
      format: 'date-time',
      widget: {
        'ui:widget': 'datetime',
      },
      default: defaultProps.activationDate,
    },
    deactivationDate: {
      title: 'Countdown: Fecha y hora de finalización del temporizador',
      type: 'string',
      format: 'date-time',
      widget: {
        'ui:widget': 'datetime',
      },
      default: defaultProps.deactivationDate,
    },
    hideDate: {
      title: 'Countdown: Fecha y hora para forzar ocultar el componente',
      type: 'string',
      format: 'date-time',
      widget: {
        'ui:widget': 'datetime',
      },
      default: defaultProps.hideDate,
    },
    visibility: {
      title: 'Countdown: Mostrar componente en la página',
      type: 'boolean',
      default: defaultProps.visibility,
    },
    bgColorCountdownBlock: {
      title: 'Countdown: Color de fondo',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: defaultProps.bgColorCountdownBlock,
    },
    bgImageCountdownBlock: {
      title: 'Countdown: Imagen de fondo',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
      default: defaultProps.bgImageCountdownBlock,
    },
    image: {
      title: 'Logo del Evento: Imagen',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
      default: defaultProps.image,
    },
    imageAlt: {
      title: 'Logo del Evento: Texto Alternativo',
      type: 'string',
      default: defaultProps.imageAlt,
    },
    textTitle: {
      title: 'Título del Countdown',
      type: 'string',
      default: defaultProps.textTitle,
    },
    textTitleSecondary: {
      title: 'Segundo Título del Countdown',
      type: 'string',
      default: defaultProps.textTitleSecondary,
    },
    colorCountdownTitle: {
      title: 'Título del Countdown: Color de texto',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: defaultProps.colorCountdownTitle,
    },
    hideTitle: {
      title: 'Ocultar Título del Countdown',
      type: 'boolean',
      default: defaultProps.hideTitle,
    },
    bgColorCountdownTimer: {
      title: 'Números Countdown: Color de fondo',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: defaultProps.bgColorCountdownTimer,
    },
    colorCountdownTimer: {
      title: 'Números Countdown: Color de texto',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: defaultProps.colorCountdownTimer,
    },
    colorCountdownDividerAndTimeUnit: {
      title: 'Separador y Unidad de Tiempo: Color de texto',
      type: 'string',
      widget: {
        'ui:widget': 'color',
      },
      default: defaultProps.colorCountdownDividerAndTimeUnit,
    },
  },
}

export default Countdown
