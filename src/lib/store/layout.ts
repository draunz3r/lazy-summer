import { readable } from 'svelte/store';


function getDevice() {
    const w = window.innerWidth;
    if (w < 640) return 'phone';
    if (w < 1024) return 'tablet';
    return 'desktop';
}

export const device = readable('phone', (set) => {
    if (typeof window === 'undefined') return;

    set(getDevice());
    const onResize = () => set(getDevice());
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);


    return () => {
        observer.disconnect();
    }
});