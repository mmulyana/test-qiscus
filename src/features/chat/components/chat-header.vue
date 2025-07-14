<script setup lang="ts">
import { Search } from 'lucide-vue-next'
defineProps<{
	name: string
	user_avatar_url: string
	user_id: string
}>()
</script>

<template>
	<div class="flex justify-between items-center bg-white p-2">
		<div class="flex gap-2 items-center">
			<img
				:src="user_avatar_url"
				alt="User Avatar"
				class="w-10 h-10 rounded-full object-cover bg-gray-300"
			/>
			<span class="font-medium">{{ name }}</span>
		</div>

		<button class='p-0 h-8 w-8 hover:bg-gray-100 hover:cursor-pointer rounded flex justify-center items-center'>
			<Search :size='18' />
		</button>
	</div>
</template>
