import React, { useState, useEffect } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { Progress } from 'vtex.styleguide'
import { FormattedCurrency } from 'vtex.format-currency'

import s from './FreeShippingBar.module.css'

const FreeShippingBar = ({ freeShippingRate, texts, toggleShow }) => {
  const {
    orderForm: { value },
  } = useOrderForm()

  const [amountLeftForFreeShipping, setAmountLeftForFreeShipping] = useState(0)
  const [percentageForFreeShipping, setPercentageForFreeShipping] = useState(1)
  const subTotal = value / 100

  useEffect(() => {
    setAmountLeftForFreeShipping(
      freeShippingRate - subTotal <= 0 ? 0 : freeShippingRate - subTotal
    )
    setPercentageForFreeShipping(
      (subTotal * 100) / freeShippingRate > 100
        ? 100
        : (subTotal * 100) / freeShippingRate
    )
  }, [subTotal, freeShippingRate])

  return (
    <>
      {toggleShow.freeShippingComponent && (
        <div className={s.freeShippingBar}>
          <div>
            {percentageForFreeShipping < 100 ? (
              <p className={s.freeShippingBar__info}>
                {texts.initial}
                <span className={s.freeShippingBar__amount}>
                  <FormattedCurrency value={amountLeftForFreeShipping} />
                </span>
                {texts.final}
              </p>
            ) : (
              <p
                className={s.freeShippingBar__info}
                style={{
                  fontSize: 14,
                }}
              >
                ¡Felicidades! Tu envío es <strong>gratis</strong> ✨🚚
              </p>
            )}
          </div>
          <div className={s.freeShippingBar__progressBarContainer}>
            <div className={s.freeShippingBar__progressBar}>
              <Progress type="line" percent={percentageForFreeShipping} />
            </div>
            {/* <span>
              <FormattedCurrency value={freeShippingRate} />
            </span> */}
          </div>
        </div>
      )}
    </>
  )
}

FreeShippingBar.defaultProps = {
  freeShippingRate: 100000,
  texts: {
    initial: '¡Solo FALTAN ',
    final: ' para el Envío gratis ✨🚚!',
    success: '¡Felicidades! Tienes Envío gratis en tu compra',
  },
  toggleShow: {
    freeShippingComponent: true,
  },
}

FreeShippingBar.schema = {
  title: 'Barra Envio Gratis',
  type: 'object',
  properties: {
    toggleShow: {
      title: 'Mostrar componente?',
      type: 'object',
      properties: {
        freeShippingComponent: {
          title: 'Mostrar componente?',
          type: 'boolean',
          default: FreeShippingBar.defaultProps.toggleShow,
        },
      },
    },
    freeShippingRate: {
      title: 'Tarifa de envío gratis. Ej: 59990',
      type: 'number',
      default: FreeShippingBar.defaultProps.freeShippingRate,
    },
    texts: {
      title: 'Texts',
      type: 'object',
      properties: {
        initial: {
          title: 'Texto Inicial',
          type: 'string',
          default: FreeShippingBar.defaultProps.texts.initial,
        },
        final: {
          title: 'Texto Final',
          type: 'string',
          default: FreeShippingBar.defaultProps.texts.final,
        },
        success: {
          title: 'Texto Exito',
          type: 'string',
          default: FreeShippingBar.defaultProps.texts.success,
        },
      },
    },
  },
}

export default FreeShippingBar
