import { component$, useWatch$, useContext, useStore } from "@builder.io/qwik";
import { AccountCtx } from "~/routes/layout";
import { getImagesForUris } from "~/helpers/tokens";

export default component$(() => {
    const account = useContext(AccountCtx);
    const data = useStore({items: [["",""]]});
    
    useWatch$(async ({ track }) => {
        track(() => { account.isConnected; });

        if (account.address === "0xs0m3th1ng") return;
        account.isLoading = true;
        const links = await getImagesForUris(account.address);
        data.items = links === null ? [["",""]] : links;
        account.isLoading = false;
    });
    
    const cards = data.items[0][0].toString() === "" ? <p class="text-white text-center m-7 p-3 border rounded-xl border-cyan">No NFTs to display</p> : 
    data.items.map(item => {
        return (
            <div class="w-50 flex flex-col justify-center items-center mx-5">
                <img src={item[0]} class="h-auto w-40 mt-10 mb-2 rounded-xl" />
                <p class="text-white text-center font-semibold">{item[1]}</p>
            </div>
        );
    });

    return(
        <div class="flex flex-wrap justify-around">
            {account.isLoading ? <p class="text-white">Loading</p> : cards}
        </div>
    );
});