import React from "react"
import { useCssHandles } from 'vtex.css-handles'
import "./index.css"

const Mujer = () => {
    const CSS_HANDLES = ["colTable", "containerTable", "item", "itemSecondLevel"]
    const handles = useCssHandles(CSS_HANDLES)
    
    return (
        <div className={`${handles.containerTable}`}>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/tops--arriba/mujer?map=category-1,genero">tops | arriba</a>
                <a className={`${handles.item}`} href="/tops--arriba/remeras--tops/mujer?map=category-1,category-2,genero">remeras & tops</a>
                <a className={`${handles.item}`} href="/tops--arriba/camisas/mujer?map=category-1,category-2,genero">camisas</a>
                <a className={`${handles.item}`} href="/tops--arriba/buzos/mujer?map=category-1,category-2,genero">buzos</a>
                <a className={`${handles.item}`} href="/tops--arriba/sweaters/mujer?map=category-1,category-2,genero">sweaters</a>
                <a className={`${handles.item}`} href="/tops--arriba/camperas/mujer?map=category-1,category-2,genero">camperas</a>
                <a className={`${handles.item}`} href="/tops--arriba/tapados--blazers/mujer?map=category-1,category-2,genero">tapados & blazers</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/bottoms--abajo/mujer?map=category-1,genero">bottoms | abajo</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/jeans/mujer?map=category-1,category-2,genero">jeans</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/mujer?map=category-1,category-2,genero">pantalones</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/joggers/mujer?map=category-1,category-2,genero">joggers</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/shorts--fitness/mujer?map=category-1,category-2,genero">shorts & fitness</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/mallas--bikinis/mujer?map=category-1,category-2,genero">mallas & bikinis</a>
                <a className={`${handles.item}`} href="/bottoms--abajo/ropa-interior/mujer?map=category-1,category-2,genero">ropa interior</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.itemSecondLevel}`} href="/accesorios/mujer?map=category-1,genero">Accesorios</a>
                <a className={`${handles.item}`} href="/accesorios/joyeria/mujer?map=category-1,category-2,genero">joyeria</a>
                <a className={`${handles.item}`} href="/accesorios/cinturones/mujer?map=category-1,category-2,genero">cinturones</a>
                <a className={`${handles.item}`} href="/accesorios/gorras/mujer?map=category-1,category-2,genero">Gorras</a>
                <a className={`${handles.item}`} href="/accesorios/medias/mujer?map=category-1,category-2,genero">Medias</a>
                <a className={`${handles.item}`} href="/accesorios/bolsos/mujer?map=category-1,category-2,genero">Bolsos</a>
                <a className={`${handles.item}`} href="/accesorios/gafas/mujer?map=category-1,category-2,genero">gafas</a>
                <a className={`${handles.item}`} href="/accesorios/bufandas/mujer?map=category-1,category-2,genero">bufandas</a>
                <a className={`${handles.item}`} href="/accesorios/zapatillas/mujer?map=category-1,category-2,genero">zapatillas</a>
            </div>
        </div>
    )

}

export default Mujer