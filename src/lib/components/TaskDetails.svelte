<script>
	import { ArrowDownToLine, Delete, Trash, X } from 'lucide-svelte';
	import { deleteTask, updateTask } from '$lib/store/tasks';
	let { task, onClose } = $props();
	let draftTitle = $state(task.title);
	let draftDescription = $state(task.description ?? '');
	let dueDate = $state(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
</script>

<div
	class="fixed inset-0 z-50 flex items-end
            bg-flo-primary/20 sm:items-center sm:justify-center"
	onclick={onClose}
	onkeydown={(e) => {
		if (e.key === 'Escape') onClose();
	}}
	role="dialog"
	aria-modal="true"
	tabindex="-1"
>
	<div
		class="w-full rounded-t-2xl bg-bg-base p-6
              sm:max-w-md sm:rounded-2xl"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="presentation"
	>
		<div class="flex flex-col items-start justify-center gap-4 rounded">
			<div class="mb-2 flex w-full flex-row items-center justify-between rounded">
				<div id="task-title" class="w-full">
					<input
						type="text"
						bind:value={draftTitle}
						class="line-clamp-1 w-11/12 rounded-xl bg-bg-subtle
           px-4 py-3 text-flo-primary
           outline-none placeholder:text-flo-faint"
					/>
				</div>
				<button
					id="task-edit-button"
					class="h-10 w-10 cursor-pointer rounded-full bg-bg-base p-3 text-flo-primary transition-colors duration-150 hover:bg-bg-subtle"
					onclick={onClose}
				>
					<X size={18} />
				</button>
			</div>
			<div id="task-description">
				<textarea
					rows="2"
					bind:value={draftDescription}
					class="w-100 resize-none rounded-xl
             bg-bg-subtle px-4
             py-3 font-display
             text-flo-primary outline-none placeholder:text-flo-faint"
					placeholder={draftDescription.length > 0 ? '' : 'Enter task description...'}
					>{draftDescription}</textarea
				>
			</div>
			<div id="task-due-date">
				<input
					type="date"
					class="w-full rounded-xl bg-bg-subtle px-4 py-3 text-flo-primary outline-none placeholder:text-flo-faint"
					bind:value={dueDate}
				/>
			</div>
			<div id="task-tags">
				{#if task.tags?.length > 0}
					{#each task.tags as tag (tag)}
						<span class="rounded bg-bg-subtle px-2 py-0.5 text-xs text-flo-muted">{tag}</span>
					{/each}
				{/if}
			</div>
			<div class="flex w-full flex-row items-center justify-between">
				<button
					id="task-delete-button"
					class="h-10 w-10 cursor-pointer rounded-full bg-bg-base p-3 text-flo-primary transition-colors duration-150 hover:bg-bg-subtle"
					onclick={(e) => {
						e.stopPropagation();
						deleteTask(task.id);
					}}
					><Trash size={18} />
				</button>
				<button
					id="task-delete-button"
					class="h-10 w-10 cursor-pointer rounded-full bg-bg-base p-3 text-flo-primary transition-colors duration-150 hover:bg-bg-subtle"
					onclick={(e) => {
						e.stopPropagation();
						updateTask(task.id, {
							title: draftTitle,
							description: draftDescription,
							dueDate: dueDate ? new Date(dueDate) : null
						});
					}}
					><ArrowDownToLine size={18} />
				</button>
			</div>
		</div>
	</div>
</div>
