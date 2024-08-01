import React, { useState, useMemo, useEffect } from 'react';
import { useProduct } from 'vtex.product-context';
import { useDevice } from 'vtex.device-detector';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import s from "./index.css";

const GenderSelector = ({ textLabelMen, textLabelWomen, fontSize }) => {
    const product = useProduct();
    const [gender, setGender] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { isMobile } = useDevice();

    const generos = product?.product?.properties.filter(item => item.name === 'Genero');
    const valoresGenero = generos?.[0]?.values ?? [];

    useEffect(() => {
        if (valoresGenero.length > 0) {
            setGender(valoresGenero[0]);
        }
    }, [valoresGenero]);

    const toggleGender = () => {
        setGender(gender === "Hombre" ? "Mujer" : "Hombre");
    };

    const openModalWithImage = (image) => {
        setCurrentImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const styleButtons = {
        fontSize: fontSize
    }

    const baseVideoUrl = product?.product?.items[0]?.videos[0]?.videoUrl;
    //const baseVideoUrl = 'https://player.vimeo.com/video/887987203'

    const videoParams = '?h=7b644bb629&autoplay=1&controls=0&muted=1&loop=1';
    const productVideoUrl = baseVideoUrl + videoParams;

    const VideoIframe = () => {
        if (!baseVideoUrl || !productVideoUrl) {
            return null;
        }

        return (
            <div className={s.videoContainer}>
                <iframe
                    src={productVideoUrl}
                    width="100%"
                    height="800px" // Ajusta según tus necesidades
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        );
    };

    const filteredImages = useMemo(() => {
        const uniqueImages = new Map();

        product?.product?.items.flatMap(item => item.images)
            .forEach(image => {
                const label = image?.imageLabel?.toLowerCase();

                if (valoresGenero.length === 0 || (gender === 'Hombre' && label.includes('hombre')) || (gender === 'Mujer' && label.includes('dama') || gender === 'Mujer' && label.includes("mujer"))) {
                    if (!uniqueImages.has(image.imageUrl)) {
                        uniqueImages.set(image.imageId, image);
                    }
                }
            });

        return Array.from(uniqueImages.values());
    }, [product, gender]);

    const imageElements = filteredImages.map((image, index) => (
        <div key={image.imageId || index} className={s.imageWrapper}>
            <img
                key={index}
                className={s.Image}
                src={image.imageUrl}
                alt={image.imageLabel}
                onClick={() => openModalWithImage(image)}
            />
        </div>
    ));

    const renderGenderSpans = ({ textLabelMen, textLabelWomen }) => {
        if (valoresGenero.includes('Hombre') && valoresGenero.includes('Mujer')) {
            return valoresGenero.map((gen) => (
                gen === 'Mujer' ? (
                    <span key="Mujer" className={`${s.switch__button_female} ${gender === 'Mujer' ? s.active : ''}`}
                        style={{ ... (gender === 'Mujer' ? styleButtons : {})}}>
                        {textLabelWomen}
                    </span>
                ) : (
                    <span key="Hombre" className={`${s.switch__button_male} ${gender === 'Hombre' ? s.active : ''}`}
                        style={{ ... (gender === 'Hombre' ? styleButtons : {})}}>
                        {textLabelMen}
                    </span>
                )
            ));
        }
        else if (valoresGenero.includes('Hombre')) {
            return (
                <span className={`${s.switch__button_male} ${s.active}`} style={styleButtons}>
                    {textLabelMen}
                </span>
            );
        }
        else if (valoresGenero.includes('Mujer')) {
            return (
                <span className={`${s.switch__button_female} ${s.active}`} style={styleButtons}>
                    {textLabelWomen}
                </span>
            );
        }
        else if (valoresGenero.length === 0 || (!valoresGenero.includes('Hombre') && !valoresGenero.includes('Dama'))) {
            return null;
        }
    };

    return (
        <div className={s.SlidesContainer}>
            <div className={s.switchContainer}>
                <button type="button" className={s.gender_switcher} onClick={toggleGender}>
                    <span className={s.switch}>
                        {renderGenderSpans({ textLabelMen, textLabelWomen })}
                    </span>
                </button>
            </div>
            <div className={s.containerImg}>
                {isMobile ? (
                    <CarouselProvider
                        naturalSlideWidth={50}
                        naturalSlideHeight={50}
                        totalSlides={filteredImages.length}
                        isIntrinsicHeight={true}
                        isPlaying={false}
                        interval={3000}
                        touchEnabled={true}
                        dragEnabled={true}
                        orientation={'horizontal'}
                        visibleSlides={1}
                        infinite={true}
                    >
                        <Slider>
                            {filteredImages.map((image, index) => (
                                <Slide index={index} key={index} className={s.genderslider}>
                                    <img
                                        key={index}
                                        className={s.ImageMobile}
                                        src={image.imageUrl}
                                        alt={image.imageLabel}
                                        onClick={() => openModalWithImage(image)}
                                    />
                                </Slide>
                            ))}
                        </Slider>
                        <DotGroup className={s.dotGroupStyle} />
                    </CarouselProvider>
                ) : (
                    <div className={s.DivImg}>
                        {imageElements}
                        <div className={s.imageWrapper}>
                            <VideoIframe />
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} close={closeModal}>
                {currentImage && (
                    <img
                        className={s.ImgZoom}
                        src={currentImage.imageUrl}
                        alt={currentImage.imageLabel}
                    />
                )}
            </Modal>
        </div>
    );
};

const Modal = ({ isOpen, close, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={s.modal} onClick={close}>
            <div className={s.modal_overlay}>
                <div className={s.modal_content} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

GenderSelector.schema = {
    title: "Switch Selector Genero",
    description: 'Switch de selector de genero en imagenes',
    type: 'object',
    properties: {
        textLabelMen: {
            title: 'Texo Boton Hombre',
            type: 'string',
            default: 'FIT HOMBRE'
        },
        textLabelWomen: {
            title: 'Texo Boton Mujer',
            type: 'string',
            default: 'FIT MUJER'
        },
        fontSize: {
            title: 'Tamaño de la fuente de los textos',
            type: 'string',
            default: '10px',
        }
    },
}


export default GenderSelector;