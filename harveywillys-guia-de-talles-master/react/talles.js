//eslint-disabled
import React, { useState } from "react";
import Modal from 'react-modal';
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';

import "./index.css";

const customStyles = {
    content: {
        padding: '40px',
        background: 'white',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        maxHeight: '90%',
        overflowY: 'auto'
    },
    contentMobile: {
        maxWidth: '100%',
        overflow: 'innerit',

    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
    }
}

const CSS_HANDLES = [
    "overlayModal",
    "contentModal",
    "textoTabla",
    "wrapperContainer",
    "imgDesktop",
    "imgMobile",
    "tittleModal",
    "tableStriped",
    "tableHeader",
    "tableRow",
    "tableCell",
    "containerBody"
];

const Talles = () => {
    const [modal, setModal] = useState(false);
    const handles = useCssHandles(CSS_HANDLES);
    const product = useProduct();
    const { isMobile } = useDevice();
    const customTableStyles = isMobile ? { overflowX: 'auto', whiteSpace: 'nowrap' } : {};

    const talles = product.product?.properties;

    //PARA ARMAR LA TABLA
    const tallesHeadString = talles?.find(prop => prop.name === "TABLA-HEAD")?.values[0];
    const tallesObj = talles?.find(prop => prop.name === "TABLA-TALLES")?.values;
    const tallesImg = talles?.find(prop => prop.name == "TABLA-IMG")?.values;

    const procesarTalles = (tallesString) => {
        const partes = tallesString.replace(/[{}'"]/g, "").split(';');
        const resultado = {};

        partes.forEach(parte => {
            const [talle, medidas] = parte.split(':');
            if (talle && medidas) {
                resultado[talle] = medidas.split(',').map(String);
            }
        });

        return resultado;
    };

    const tallesProcesados = tallesObj && tallesObj[0] ? procesarTalles(tallesObj[0]) : {};
    const tallesHead = tallesHeadString ? tallesHeadString.replace(/[{}' ]/g, "").split(',') : [];

    const maxMedidas = Math.max(...Object.values(tallesProcesados).map(medidas => medidas.length));

    return (
        <div className={`${handles.wrapperContainer}`}>
            <a className={`${handles.textoTabla}`} onClick={() => setModal(true)} href="#">Tabla de talles</a>
            <Modal className={`${handles.contentModal}`} style={customStyles} isOpen={modal} onRequestClose={() => setModal(false)} >
                <a style={{ float: "right", textDecoration: "none" }} onClick={() => setModal(false)} href="#">X</a>
                <h2 className={`${handles.tittleModal}`}>Guía de Talles</h2>
                <div className={`${handles.containerBody}`}>
                    <img className={isMobile ? `${handles.imgMobile}` : `${handles.imgDesktop}`} src={`/arquivos/${tallesImg}`} alt="Tabla de talles" />
                    <table className={`${handles.tableStriped}`} style={customTableStyles}>
                        <thead>
                            <tr>
                                {tallesHead.map((header, index) => (
                                    <th key={index} className={`${handles.tableHeader}`}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(tallesProcesados).map(([talle, medidas]) => (
                                <tr key={talle} className={`${handles.tableRow}`}>
                                    <td className={`${handles.tableCell}`}>
                                        {talle.toUpperCase()}
                                    </td>
                                    {Array.from({ length: maxMedidas }).map((_, index) => (
                                        <td key={index} className={`${handles.tableCell}`}>{medidas[index] || ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
};

export default Talles;