import { component$, Slot, createContext, useContextProvider, useStore } from "@builder.io/qwik";
import { Types } from "aptos";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface IAccount {
    address: string,
    isConnected: boolean,
    account: Types.AccountData | null,
    isLoading: boolean,
}
export const AccountCtx = createContext<IAccount>("Account");

export default component$(() => {
    
    const account = useStore<IAccount>({
        address: "0xs0m3th1ng",
        isConnected: false,
        account: null,
        isLoading: false
    });

    useContextProvider(AccountCtx, account);
    
    return (
        <div class="flex flex-col min-h-screen justify-between">
        <Navbar />
            <main class="flex flex-grow bg-dark justify-center items-center">
            <section>
                <Slot />
            </section>
        </main>
        <Footer />
        </div >
    );
});
