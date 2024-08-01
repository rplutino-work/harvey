import React, { useState, useEffect } from "react"
import { useCssHandles } from 'vtex.css-handles'
import Outlet from './outlet'
import Colecciones from './colecciones'

import "./index.css"
import Hombre from "./hombre"
import Mujer from "./mujer"

const CSS_HANDLES = [
    "menuContainer",
    "menuItemFirstLevel",
    "listadoItems",
    "itemFirstLevel",
    "colTable",
    "containerTable",
    "item",
    "enlace",
    "containerFirstLevel",
    "secondLevelContainer"
]

const menu = () => {
    const handles = useCssHandles(CSS_HANDLES)

    const [selectCol, setSelectCol] = useState(false)
    const [selectOut, setSelectOut] = useState(false)

    const [load, setLoad] = useState(false)

    const handleHombre = () => {
        setSelectCol(true)
        setSelectOut(false)
    }

    const handleMujer = () => {
        setSelectCol(true)
        setSelectOut(false)
    }
    const handleColecciones = () => {
        setSelectCol(true)
        setSelectOut(false)
    }

    const handleOutlet = () => {
        setSelectOut(true)
        setSelectCol(false)
    }
    const handleTodos = () => {
        setSelectOut(false)
        setSelectCol(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 2000);
    }, [load]);

    return (
        <div className={`${handles.menuContainer}`} onMouseLeave={handleTodos}>
            {load ?
                <nav className={`${handles.containerFirstLevel}`}>
                    <ul className={`${handles.listadoItems}`}>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleHombre}>
                            <a className={`${handles.enlace}`} href="/mujer">Mujer</a>
                        </li>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleMujer}>
                            <a className={`${handles.enlace}`} href="/hombre">HOMBRE</a>
                        </li>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleColecciones}>
                            <a className={`${handles.enlace}`} href="/ropa">NEW COLLECTION</a>
                        </li>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleOutlet} >
                            <a className={`${handles.enlace}`} href="/outlet">OTRAS TEMPORADAS</a>
                        </li>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleTodos}>
                            <a className={`${handles.enlace}`} href="/home">COOL STUFF</a>
                        </li>
                        <li className={`${handles.itemFirstLevel}`} onMouseOver={handleTodos}>
                            <a className={`${handles.enlace}`} href="/140?map=productClusterIds">SUNSETSTRIP</a>
                        </li>
                    </ul>
                </nav> : null}
            <div className={`${handles.secondLevelContainer}`} onMouseLeave={() => { setSelectCol(false) }}>
                {selectCol ? <Mujer /> : null}
            </div>
            <div className={`${handles.secondLevelContainer}`} onMouseLeave={() => { setSelectCol(false) }}>
                {selectCol ? <Hombre /> : null}
            </div>
            <div className={`${handles.secondLevelContainer}`} onMouseLeave={() => { setSelectCol(false) }}>
                {selectCol ? <Colecciones /> : null}
            </div>
            <div className={`${handles.secondLevelContainer}`} onMouseLeave={() => { setSelectOut(false) }}>
                {selectOut ? <Outlet /> : null}
            </div>
        </div>    // menuContainer
    )

}

export default menu