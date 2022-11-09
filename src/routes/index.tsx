import { component$, useContext, useWatch$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AccountCtx } from "~/context/DappContext";
import Mosaic from "~/components/Mosaic/Mosaic";

export default component$(() => {

    const account = useContext(AccountCtx);    
    const addrStart = account.address.slice(0, 5);
    const addrEnd = account.address.slice(61);

    useWatch$(({track}) => {
        track(() => account.isLoading);
    });

    return (
        <>{account.isConnected ? <div>
            <p class="text-cyan text-center mt-10"><code>{addrStart.concat("...", addrEnd)}</code></p>
            <p class="text-white text-center">Succesfully logged in</p>
            <Mosaic />
        </div> :
        <div>
            <p class="text-cyan text-center mt-10"><code>0xs0m3th1ng</code></p>
            <p class="text-white text-center">You're not logged in</p>
        </div>}</>
    );
});

export const head: DocumentHead = {
    title: "Aptos Showcase",
};
