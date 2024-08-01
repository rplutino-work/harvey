import React, { useEffect } from 'react'
import { Helmet } from 'vtex.render-runtime'

function EmailMkt() {
    useEffect(() => {
        window.perfitSettings = { app: 'harveywillys', source: 'vtex' };

        if (typeof window.Perfit !== 'function') {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://js.myperfit.net/perfit.js';
            script.onload = () => {
                Perfit('identify');
                Perfit('visit');
            };

            document.head.appendChild(script);
        }
    }, []);

    return (
        <>
            <Helmet>
                <meta property="og:type" content="article" />
            </Helmet>
        </>
    );
}

export default EmailMkt;