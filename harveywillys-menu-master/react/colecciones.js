import React from "react"
import { useCssHandles } from 'vtex.css-handles'
import "./index.css"

const Colecciones = () => {
    const CSS_HANDLES = ["colTable", "containerTable", "item","itemSecondLevel"]
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className={`${handles.containerTable}`}>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/ropa/tops-•-arriba">tops | arriba</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/remeras">remeras</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/camisas">camisas</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/buzos">buzos</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/sweaters">sweaters</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/camperas">camperas</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/vestidos">vestidos</a>
                <a className={`${handles.item}`} href="/ropa/tops-•-arriba/tapados---blazers">tapados & blazers</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/ropa/bottoms-•-abajo">bottoms | abajo</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/jeans">jeans</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/pantalones">pantalones</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/joggers">joggers</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/shorts">shorts</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/polleras---faldas">polleras & faldas</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/mallas">mallas</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/boxers">boxers</a>
                <a className={`${handles.item}`} href="/ropa/bottoms-•-abajo/ropa-interior">ropa interior</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/accesorios">Accesorios</a>
                <a className={`${handles.item}`} href="/accesorios/joyeria">joyeria</a>
                <a className={`${handles.item}`} href="/accesorios/cinturones">cinturones</a>
                <a className={`${handles.item}`} href="/accesorios/gorras">Gorras</a>
                <a className={`${handles.item}`} href="/accesorios/medias">Medias</a>
                <a className={`${handles.item}`} href="/accesorios/bolsos">Bolsos</a>
                <a className={`${handles.item}`} href="/accesorios/gafas">gafas</a>
                <a className={`${handles.item}`} href="/accesorios/bandanas">bandanas</a>
                <a className={`${handles.item}`} href="/accesorios/bufandas">bufandas</a>
                <a className={`${handles.item}`} href="/accesorios/zapatillas">zapatillas</a>
            </div>
        </div>
    )

}

export default Colecciones