import { writable } from 'svelte/store';

let saved = null;

if (typeof localStorage !== 'undefined') {
	saved = localStorage.getItem('flo_tasks');
} else {
	console.warn('localStorage is not available. Tasks will not be saved across sessions.');
	saved = null;
}
const initial = saved ? JSON.parse(saved) : [];

export const tasks = writable(initial);

export const addTask = (title = '', description = '', dueDate: Date | null = null, tags: Array<string> = []) => {
	const id = crypto.randomUUID();

	if (!title) {
		// Title should be mandatory, if not provided, we  throw an error
		throw new Error('Task title is required');
	}

	tasks.update((current) => [
		...current,
		{ id, title, description, dueDate, tags, completed: false, createdAt: new Date().toISOString() }
	]);
};

export const completeTask = (id: String) => {
	tasks.update(all =>
		all.map(task =>
			task.id === id
				? { ...task, completed: !task.completed }
				: task
		)
	);
};

export const deleteTask = (id: String) => {
	tasks.update(all => all.filter(task => task.id !== id));
};

export const updateTask = (id: String, updates: Partial<{ title: String; description: String; dueDate: Date | null; tags: Array<string> }>) => {
	tasks.update(all =>
		all.map(task =>
			task.id === id
				? { ...task, ...updates }
				: task
		)
	);
};


if (typeof localStorage !== 'undefined') {
	tasks.subscribe((value) => {
		localStorage.setItem('flo_tasks', JSON.stringify(value));
	});
}
