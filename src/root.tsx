import { component$ } from "@builder.io/qwik";
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import DappContext from "./context/DappContext";

import "./global.css";

declare global {
    interface Window { aptos: any; }
}

export default component$((): any => {
    return (
        <QwikCity>
                <head>
                    <meta charSet="utf-8" />
                    <RouterHead />
                </head>
                <body lang="en">
                    <DappContext>
                        <RouterOutlet />
                        <ServiceWorkerRegister />
                    </DappContext>
                </body>
            </QwikCity>
    );
});
