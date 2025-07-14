<script setup lang="ts">
import { SendHorizonal } from 'lucide-vue-next'
import { computed, nextTick, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useLocalStorage } from '../../../hooks/use-localstorages'
import { useChatStore } from '../../../stores/chat'
import { getRandomMessage } from '../../../utils'
import type { Message } from '../../../types'

import ChatHeader from './chat-header.vue'
import ChatBubble from './chat-bubble.vue'

const props = defineProps<{
	user_id: string
}>()

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const chatContainer = ref<HTMLDivElement | null>(null)

const newMessage = ref('')
const messages = useLocalStorage<Message[]>(props.user_id, [])

const customer = computed(() => {
	return selecteds.value.find((c) => c.user_id === props.user_id)
})

function scrollToBottom() {
	if (chatContainer.value) {
		chatContainer.value.scrollTop = chatContainer.value.scrollHeight
	}
}

function handleSubmit() {
	const trimmed = newMessage.value.trim()
	if (trimmed) {
		messages.value.push({
			message: trimmed,
			photo: 'https://cdn-icons-png.flaticon.com/512/16683/16683419.png',
			type: 'user',
			user_id: 'admin',
		})
		nextTick(() => scrollToBottom())

		const replyMessage: Message = {
			photo: customer.value?.user_avatar_url || '',
			message: getRandomMessage(),
			type: 'customer',
			user_id: props.user_id,
		}
		setTimeout(() => {
			messages.value.push(replyMessage)
			nextTick(() => scrollToBottom())
		}, 1500)
		newMessage.value = ''
	}
}
</script>

<template>
	<div
		class="w-full bg-white rounded-lg border border-gray-200 overflow-hidden h-full relative"
	>
		<ChatHeader
			:name="customer?.name || ''"
			:user_avatar_url="customer?.user_avatar_url || ''"
			:user_id="user_id"
		/>
		<div
			class="w-full h-[calc(100%-40px)] overflow-y-auto p-4 pb-20 scroll-smooth"
			ref="chatContainer"
		>
			<ChatBubble
				v-for="(msg, index) in messages"
				:key="index"
				:message="msg.message"
				:user_id="msg.user_id"
				:photo="msg.photo"
				:type="msg.type"
			/>
		</div>
		<div
			class="absolute bottom-0 w-full bg-white h-fit border-t border-gray-200 p-2.5"
		>
			<form @submit.prevent="handleSubmit" class="flex gap-2">
				<input
					v-model="newMessage"
					placeholder="Apa kabar"
					class="border w-full h-10 border-gray-200 px-2 rounded-lg bg-gray-50"
				/>
				<button
					type="submit"
					class="bg-blue-600 justify-center flex items-center rounded-lg text-white px-2 pr-2.5 gap-2"
				>
					<SendHorizonal />
					Send
				</button>
			</form>
		</div>
	</div>
</template>
