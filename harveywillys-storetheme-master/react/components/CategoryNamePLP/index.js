import React, { useState, useEffect } from 'react';
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext';
import { useDevice } from 'vtex.device-detector';

const CategoryNamePDP = ({ isEnabled, value, fontColor, fontSize }) => {
    const { isMobile } = useDevice();
    const products = useSearchPage();
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (products?.params?.subcategory) {

            const formattedCategoryName = products.params.subcategory
                .toUpperCase()
                .replace(/-/g, ' ');
            setCategoryName(formattedCategoryName);
        }
    }, [products]);

    const styleH1 = {
        fontFamily: "Poppins",
        fontWeight: 400,
        textAlign: 'center',
        fontSize: fontSize,
        color: fontColor,
        width: '100%',
        //marginRight: isMobile ? '0px' : '200px'
    }

    return (
        true ? (
            <h1 style={styleH1}>
                {isEnabled && value != null ? value?.toUpperCase() : categoryName}
            </h1>
        ) : null
    );
}

CategoryNamePDP.schema = {
    type: 'object',
    title: 'Nombre Categorias en PLP',
    properties: {
        isEnabled: {
            title: 'Cambiar Texto Por Defecto ?',
            type: 'boolean',
            default: false,
        },
        value: {
            title: 'Nombre De La Categoria',
            type: 'string',
            description:
                'Si no se especifica ninguna, carga por defecto la configurada',
        },
        fontColor: {
            title: 'Color de la letra',
            description: 'Por defecto negro',
            type: 'string',
            default: '#000',
            widget: {
                'ui:widget': 'color',
            },
        },
        fontSize: {
            title: 'Tamaño de la fuente',
            description: 'Por defecto 32px',
            type: 'string',
            default: '32px',
        }
    }
}

export default CategoryNamePDP;