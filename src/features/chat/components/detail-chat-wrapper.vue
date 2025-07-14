<script setup lang="ts">
import ChatHeader from './chat-header.vue'
import { useChatStore } from '../../../stores/chat'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps<{
	user_id: string
}>()

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const chat = computed(() => {
	return selecteds.value.find((c) => c.user_id === props.user_id)
})
</script>

<template>
	<div class='w-full'>
		<ChatHeader
			:name="chat?.name || ''"
			:user_avatar_url="chat?.user_avatar_url || ''"
			:user_id="user_id"
		/>
	</div>
</template>
