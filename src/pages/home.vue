<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import DetailChatWrapper from '../features/chat/components/detail-chat-wrapper.vue'
import ToggleTheme from '../features/theme/components/toggle-theme.vue'
import ChatWrapper from '../features/chat/components/chat-wrapper.vue'
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const layoutClass = computed(() => {
	if (selecteds.value.length > 1) return 'grid grid-cols-2 min-h-0'
	return 'grid grid-cols-1 min-h-0'
})
</script>

<template>
	<div
		class="absolute left-0 top-0 h-full w-16 bg-[#23B098] dark:bg-[#1fa187aa] flex flex-col justify-end items-center py-4"
	>
		<ToggleTheme />
	</div>
	<div class="flex gap-4 h-[calc(100vh-2rem)] pl-16">
		<ChatWrapper />
		<div class="flex-1 gap-4" :class="layoutClass">
			<DetailChatWrapper
				v-for="item in selecteds"
				:key="item.user_id"
				:user_id="item.user_id"
			/>
		</div>
	</div>
</template>
