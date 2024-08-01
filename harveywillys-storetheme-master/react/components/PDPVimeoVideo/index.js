import React, { useEffect } from 'react';
import { useProduct } from 'vtex.product-context';
import { useDevice } from "vtex.device-detector"

const PDPVimeoVideo = () => {
  const productContext = useProduct();
  const { isMobile } = useDevice()

  useEffect(() => {
    const baseVideoUrl = productContext?.product?.items[0]?.videos[0]?.videoUrl;

    const videoParams = '?h=7b644bb629&autoplay=1&controls=0&muted=1&loop=1';
    const productVideoUrl = baseVideoUrl + videoParams;

    if (!isMobile && baseVideoUrl) {
      const parentContainer = document.querySelector('.vtex-store-components-3-x-productImagesContainer--list');

      if (parentContainer) {

        const existingIframe = parentContainer.querySelector('iframe[src^="' + baseVideoUrl + '"]');

        if (!existingIframe) {
          const iframe = document.createElement('iframe');
          iframe.src = productVideoUrl;
          iframe.style.cssText = "position:relative;top:0;left:0;width:100%;height:800px;";
          iframe.frameBorder = "0";
          iframe.allow = "autoplay; fullscreen; picture-in-picture";
          iframe.allowFullscreen = true;

          // Aplicar estilos responsivos -- solo cuando el video tiene menor resolucion
          const styleSheet = document.createElement("style");
          styleSheet.type = "text/css";
          styleSheet.innerText = `
        @media screen and (max-width: 733px) {
          iframe {
            width: 100%;
            height: 100%;
          }
        }
      `;
          document.head.appendChild(styleSheet);
          const iframeContainer = document.createElement('div');
          iframeContainer.classList.add('vtex-store-components-3-x-productImage');
          iframeContainer.style.cssText = "width:100%;position:relative;";
          iframeContainer.appendChild(iframe);

          if (parentContainer) {
            const firstChild = parentContainer.firstChild;
            parentContainer.insertBefore(iframeContainer, firstChild);
          }
        }
      }
    }

  }, [productContext, productContext?.product?.items[0]]);

  return null;
};

export default PDPVimeoVideo;