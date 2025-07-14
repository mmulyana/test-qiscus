<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatWrapper from '../features/chat/components/chat-wrapper.vue'
import { useChatStore } from '../stores/chat'
import DetailChatWrapper from '../features/chat/components/detail-chat-wrapper.vue'
import { computed } from 'vue'

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const layoutClass = computed(() => {
	if (selecteds.value.length > 1) return 'grid grid-cols-2 min-h-0'
	return 'grid grid-cols-1 min-h-0'
})
</script>

<template>
	<div class="flex gap-4 h-[calc(100vh-2rem)]">
		<ChatWrapper />
		<div class="flex-1 gap-4" :class="layoutClass">
			<div v-for="item in selecteds" class="w-full overflow-y-auto">
				<DetailChatWrapper :user_id="item.user_id" />
			</div>
		</div>
	</div>
</template>
