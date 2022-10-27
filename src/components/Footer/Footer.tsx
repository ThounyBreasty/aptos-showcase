import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <footer class="bg-dark border-t border-t-gray flex flex-wrap place-items-center justify-center p-7 lg:p-10">
            <a class="text-white transition-colors duration-300 ease-in-out hover:text-cyan" href="https://github.com/ThounyBreasty/" target="_blank">
                Made with ♡ by Thouny Breasty
            </a>
        </footer>
    );
});