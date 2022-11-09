import { component$, useStore, useContextProvider, createContext, Slot } from "@builder.io/qwik";

interface IAccount {
    address: string,
    isConnected: boolean,
    isLoading: boolean,
    extensionOpened: boolean,
}
export const AccountCtx = createContext<IAccount>("Account");

export default component$(() => {

    const account = useStore<IAccount>({
        address: "0xs0m3th1ng",
        isConnected: false,
        isLoading: false,
        extensionOpened: false,
    });

    useContextProvider(AccountCtx, account);
    return (
        <div><Slot /></div>
    );
});