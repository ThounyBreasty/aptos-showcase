import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { AccountCtx } from "~/routes/layout";
import Mosaic from "~/components/Mosaic/Mosaic";

export default component$(() => {

    const account = useContext(AccountCtx);    
    const addrStart = account.address.slice(0, 5);
    const addrEnd = account.address.slice(61);

    return (
        <div>
            <p class="text-cyan text-center mt-10"><code>{account.address === "0xs0m3th1ng" ? "0xs0m3th1ng" : addrStart.concat("...", addrEnd)}</code></p>
            <p class="text-white text-center">{account.isConnected ? "Succesfully logged in" : "You're not logged in"}</p>
            <Mosaic />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Aptos Showcase",
};
