import React from "react"
import { useCssHandles } from 'vtex.css-handles'
import "./index.css"

const Hombre = () => {
    const CSS_HANDLES = ["colTable", "containerTable", "item","itemSecondLevel"]
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className={`${handles.containerTable}`}>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/tops--arriba/hombre?map=category-1,genero">tops | arriba</a>
                <a className={`${handles.item}`} href="/tops--arriba/remeras/hombre?map=category-1,category-2,genero">remeras</a>
                <a className={`${handles.item}`} href="/tops--arriba/camisas/hombre?map=category-1,category-2,genero">camisas</a>
                <a className={`${handles.item}`} href="/tops--arriba/buzos/hombre?map=category-1,category-2,genero">buzos</a>
                <a className={`${handles.item}`} href="/tops--arriba/sweaters/hombre?map=category-1,category-2,genero">sweaters</a>
                <a className={`${handles.item}`} href="/tops--arriba/camperas/hombre?map=category-1,category-2,genero">camperas</a>
                <a className={`${handles.item}`} href="/tops--arriba/tapados--blazers/hombre?map=category-1,category-2,genero">tapados & blazers</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/bottoms--abajo/hombre?map=category-1,genero">bottoms | abajo</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/jeans/hombre?map=category-1,category-2,genero">jeans</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/pantalones/hombre?map=category-1,category-2,genero">pantalones</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/joggers/hombre?map=category-1,category-2,genero">joggers</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/shorts/hombre?map=category-1,category-2,genero">shorts</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/mallas/hombre?map=category-1,category-2,genero">mallas</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/boxers/hombre?map=category-1,category-2,genero">boxers</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/accesorios/hombre?map=category-1,genero">Accesorios</a>
                <a className={`${handles.item}`} href="/accesorios/joyeria/hombre?map=category-1,category-2,genero">joyeria</a>
                <a className={`${handles.item}`} href="/accesorios/cinturones/hombre?map=category-1,category-2,genero">cinturones</a>
                <a className={`${handles.item}`} href="/accesorios/gorras/hombre?map=category-1,category-2,genero">Gorras</a>
                <a className={`${handles.item}`} href="/accesorios/medias/hombre?map=category-1,category-2,genero">Medias</a>
                <a className={`${handles.item}`} href="/accesorios/bolsos/hombre?map=category-1,category-2,genero">Bolsos</a>
                <a className={`${handles.item}`} href="/accesorios/gafas/hombre?map=category-1,category-2,genero">gafas</a>
                <a className={`${handles.item}`} href="/accesorios/bandanas/hombre?map=category-1,category-2,genero">bandanas</a>
                <a className={`${handles.item}`} href="/accesorios/bufandas/hombre?map=category-1,category-2,genero">bufandas</a>
                <a className={`${handles.item}`} href="/accesorios/zapatillas/hombre?map=category-1,category-2,genero">zapatillas</a>
            </div>
        </div>
    )

}

export default Hombre