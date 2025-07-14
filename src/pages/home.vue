<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatWrapper from '../features/chat/components/chat-wrapper.vue'
import { useChatStore } from '../stores/chat'
import DetailChatWrapper from '../features/chat/components/detail-chat-wrapper.vue'
import { computed } from 'vue'

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const layoutClass = computed(() => {
	if (selecteds.value.length > 1) return 'grid grid-cols-2'
	return 'grid grid-cols-'
})
</script>

<template>
	<div class="flex gap-4">
		<ChatWrapper />
		<div class="flex-1 gap-4" :class="layoutClass">
			<div v-for="item in selecteds" class="w-full min-w-full">
				<DetailChatWrapper :user_id="item.user_id" />
			</div>
		</div>
	</div>
</template>
