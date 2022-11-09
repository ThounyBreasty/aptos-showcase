import { component$, Slot, useContext } from "@builder.io/qwik";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { AccountCtx } from "~/context/DappContext";

export default component$(() => {
    const account = useContext(AccountCtx);
    
    return (
        <div class="flex flex-col min-h-screen justify-between">
        <Navbar />
            <main class="flex flex-grow bg-dark justify-center items-center">
            <section>
                {account.extensionOpened ? 
                <p class="text-cyan text-center"><code>Approve connection on your wallet.</code></p> : 
                    (account.isLoading ? 
                    <p class="text-cyan text-center"><code>LOADING...</code></p> : 
                    <Slot />)
                }
            </section>
        </main>
        <Footer />
        </div >
    );
});
