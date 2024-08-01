import React from "react"
import { useCssHandles } from 'vtex.css-handles'
import "./index.css"

const Outlet = () => {
    const CSS_HANDLES = ["colTable", "containerTable", "item", "itemSecondLevel"]
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <div className={`${handles.containerTable}`}>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.item}`} href="/outlet/remeras">remeras</a>
                <a className={`${handles.item}`} href="/outlet/camisas">camisas</a>
                <a className={`${handles.item}`} href="/outlet/buzos">buzos</a>
                <a className={`${handles.item}`} href="/outlet/camperas">camperas</a>
                <a className={`${handles.item}`} href="/outlet/sweaters">sweaters</a>
                <a className={`${handles.item}`} href="/outlet/jeans">jeans</a>
            </div>
            <div className={`${handles.colTable}`}>
                <a className={`${handles.item}`} href="/outlet/pantalones">pantalones</a>
                <a className={`${handles.item}`} href="/outlet/joggers">joggers</a>
                <a className={`${handles.item}`} href="/outlet/shorts">shorts</a>
                <a className={`${handles.item}`} href="/outlet/mallas">mallas</a>
                <a className={`${handles.item}`} href="/outlet/bikinis">bikinis</a>
                <a className={`${handles.item}`} href="/outlet/accesorios">accesorios</a>
            </div>
        </div>
    )

}

export default Outlet