<script setup lang="ts">
import { PinOff } from 'lucide-vue-next'
import { useChatStore } from '../../../stores/chat'
defineProps<{
	name: string
	user_avatar_url: string
	user_id: string
}>()

const chatStore = useChatStore()

function onRemove(id: string) {
	chatStore.removeSelected(id)
}
</script>

<template>
	<div
		class="flex justify-between items-center bg-white p-2.5 px-4 border-b border-gray-200 dark:bg-[#2a2929] dark:border-gray-300/20 rounded-none"
	>
		<div class="flex gap-2 items-center">
			<img
				:src="user_avatar_url"
				alt="User Avatar"
				class="w-10 h-10 rounded-full object-cover bg-gray-300"
			/>
			<span class="font-medium dark:text-white">{{ name }}</span>
		</div>

		<button
			@click="() => onRemove(user_id)"
			class="p-0 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-500/20 hover:cursor-pointer rounded flex justify-center items-center dark:text-white"
		>
			<PinOff :size="18" />
		</button>
	</div>
</template>
