import { writable } from 'svelte/store';

let tags: Array<string>;

if (typeof localStorage !== 'undefined') {
    let initialTags: string | null = localStorage.getItem('flo_tags');
    tags = initialTags ? JSON.parse(initialTags) : ['work', 'health', 'personal'];
} else {
    console.warn('localStorage is not available. Tasks will not be saved across sessions.');
    tags = ['work', 'health', 'personal'];
}


export const tagsStore = writable(tags);
tagsStore.subscribe(value => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('flo_tags', JSON.stringify(value));
});

export const addTag = (tag: string) => {
    tag = tag.trim();
    if (!tag) throw new Error('Tag cannot be empty');
    tagsStore.update(all => {
        if (all.includes(tag)) {
            console.log('Tag already exists');
            return all;
        }
        return [...all, tag];
    });
};

export const removeTag = (tag: string = '') => {
    tagsStore.update(all => all.filter(t => t !== tag));
};