import { component$, $, useContext } from "@builder.io/qwik";
import { AccountCtx } from "~/context/DappContext";

export const LogButton = component$(() => {
    const account = useContext(AccountCtx);

    const onLogIn = $(async () => {
        if (account.isConnected === true) { return; }
        try {
            account.extensionOpened = true;
            await window.aptos.connect();
            const data = await window.aptos.account();   
            account.address = data.address;
        } finally {
            account.isConnected = true;
            account.extensionOpened = false;
        }
    });

    const onLogOut = $(async () => {
        if (account.isConnected === false) { return; }
        await window.aptos.disconnect();
        account.isConnected = false;
        account.isLoading = false;
        account.address = "0xs0m3th1ng";
    });

    return (

        <button onClick$={account.isConnected ? onLogOut : onLogIn} class="transition-colors duration-300 ease-in-out px-4 py-1 text-sm hover:bg-cyan hover:border-cyan hover:text-dark text-white font-semibold rounded-full border border-black">{ account.isConnected ? "Disconnect" : "Connect"}</button>
    );
});