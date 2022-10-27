import { component$ } from "@builder.io/qwik";
import { LogButton, Github, Twitter } from "~/components/buttons";

export default component$(() => {
    return (
        <div class="flex place-items-center bg-dark p-5 lg:p-8 border-b-gray border-b">
            <nav class="flex justify-between w-screen">
                <a class="text-3xl text-white font-bold transition-colors duration-300 ease-in-out hover:text-cyan" href="#">
                    Aptos Showcase.
                </a>
                <div class="flex px-4 items-center font-semibold md:space-x-12 space-x-4">
                    <Twitter />
                    <Github />
                    <LogButton />
                </div>
            </nav>
        </div>
    );
});
