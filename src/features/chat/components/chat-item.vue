<script setup lang="ts">
import { format } from 'date-fns'

defineProps<{
	id: number
	last_comment_sender: string
	last_comment_text: string
	last_comment_timesmap: string
	name: string
	user_avatar_url: string
	active: boolean
	onClick?: () => void
}>()
</script>

<template>
	<div
		class="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-100 relative"
		:class="{ 'bg-gray-100': active }"
		@click="onClick"
	>
		<div v-if="active" class="absolute h-full w-1 bg-blue-600 left-0"></div>
		<img
			:src="user_avatar_url"
			alt="User Avatar"
			class="w-10 h-10 rounded-full object-cover bg-gray-300"
		/>
		<div class="flex-1">
			<div class="text-sm font-semibold">{{ name }}</div>
			<div class="text-xs text-gray-500">
				{{ last_comment_text }}
			</div>
		</div>
		<div class="text-xs text-gray-400">
			{{ format(new Date(last_comment_timesmap), 'PPP') }}
		</div>
	</div>
</template>
